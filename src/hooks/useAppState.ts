import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type { GameState, GamePhase, TetrominoType } from '../types/domain';
import {
  getInitialGameState,
  isValidPosition,
  getGhostY,
  tryRotate,
  processLock,
  tickGame,
  spawnPiece,
  createEmptyBoard,
  getDropInterval,
  fillQueue,
} from '../types/domain';
import { getHighScore, setHighScore, saveHighScore, clearAllData } from '../utils/storage';

export interface GameActions {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  goToMenu: () => void;
  goToControls: () => void;
  goToOptions: () => void;
  goToRanks: () => void;
  goToNextPiece: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  softDrop: () => void;
  hardDrop: () => void;
  rotateCW: () => void;
  rotateCCW: () => void;
  holdPiece: () => void;
  tick: () => void;
  resetGame: () => void;
  clearData: () => void;
}

export interface UseAppStateReturn {
  state: GameState;
  actions: GameActions;
}

export function useAppState(): UseAppStateReturn {
  const [state, setState] = useState<GameState>(() => getInitialGameState(getHighScore()));
  const stateRef = useRef(state);
  stateRef.current = state;

  // Persist high score on game over
  useEffect(() => {
    if (state.phase === 'gameover') {
      const entry = {
        score: state.score,
        level: state.level,
        lines: state.lines,
        date: new Date().toISOString(),
      };
      saveHighScore(entry);
      setHighScore(state.highScore);
    }
  }, [state.phase, state.score, state.level, state.lines, state.highScore]);

  // Auto-drop timer
  useEffect(() => {
    if (state.phase !== 'playing') return;
    const interval = getDropInterval(state.level);
    const timer = setInterval(() => {
      setState(prev => tickGame(prev));
    }, interval);
    return () => clearInterval(timer);
  }, [state.phase, state.level]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const phase = stateRef.current.phase;
      const key = e.key;

      // Global keys
      if (key === 'p' || key === 'P' || key === 'Escape') {
        if (phase === 'playing') {
          e.preventDefault();
          setState(prev => ({ ...prev, phase: 'paused' }));
          return;
        }
        if (phase === 'paused') {
          e.preventDefault();
          setState(prev => ({ ...prev, phase: 'playing' }));
          return;
        }
      }

      if (phase !== 'playing') return;

      // Game controls
      switch (key) {
        case 'ArrowLeft':
          e.preventDefault();
          setState(prev => {
            if (!prev.currentPiece) return prev;
            const moved = { ...prev.currentPiece, x: prev.currentPiece.x - 1 };
            return isValidPosition(prev.board, moved) ? { ...prev, currentPiece: moved } : prev;
          });
          break;
        case 'ArrowRight':
          e.preventDefault();
          setState(prev => {
            if (!prev.currentPiece) return prev;
            const moved = { ...prev.currentPiece, x: prev.currentPiece.x + 1 };
            return isValidPosition(prev.board, moved) ? { ...prev, currentPiece: moved } : prev;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setState(prev => {
            if (!prev.currentPiece) return prev;
            const dropped = { ...prev.currentPiece, y: prev.currentPiece.y + 1 };
            if (isValidPosition(prev.board, dropped)) {
              return { ...prev, currentPiece: dropped, score: prev.score + 1 };
            }
            return processLock(prev, 1, false);
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setState(prev => {
            if (!prev.currentPiece) return prev;
            const rotated = tryRotate(prev.board, prev.currentPiece, 1);
            return rotated ? { ...prev, currentPiece: rotated } : prev;
          });
          break;
        case ' ':
          e.preventDefault();
          setState(prev => {
            if (!prev.currentPiece) return prev;
            const ghostY = getGhostY(prev.board, prev.currentPiece);
            const dropDistance = ghostY - prev.currentPiece.y;
            const hardDropped = { ...prev.currentPiece, y: ghostY };
            return processLock({ ...prev, currentPiece: hardDropped }, dropDistance, true);
          });
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          setState(prev => {
            if (!prev.currentPiece) return prev;
            const rotated = tryRotate(prev.board, prev.currentPiece, -1);
            return rotated ? { ...prev, currentPiece: rotated } : prev;
          });
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          setState(prev => {
            if (!prev.currentPiece || !prev.canHold) return prev;
            const currentType = prev.currentPiece.type;
            const holdType = prev.holdPiece;
            if (holdType) {
              return {
                ...prev,
                currentPiece: spawnPiece(holdType),
                holdPiece: currentType,
                canHold: false,
              };
            }
            const nextType = prev.nextPieces[0];
            const remaining = prev.nextPieces.slice(1);
            const { queue: filledQueue, bag: newBag } = fillQueue(remaining, prev.bag);
            return {
              ...prev,
              currentPiece: spawnPiece(nextType),
              nextPieces: filledQueue,
              bag: newBag,
              holdPiece: currentType,
              canHold: false,
            };
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startGame = useCallback(() => {
    setState(prev => {
      const fresh = getInitialGameState(prev.highScore);
      return { ...fresh, phase: 'playing' };
    });
  }, []);

  const pauseGame = useCallback(() => {
    setState(prev => prev.phase === 'playing' ? { ...prev, phase: 'paused' } : prev);
  }, []);

  const resumeGame = useCallback(() => {
    setState(prev => prev.phase === 'paused' ? { ...prev, phase: 'playing' } : prev);
  }, []);

  const goToMenu = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'menu' }));
  }, []);

  const goToControls = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'controls' }));
  }, []);

  const goToOptions = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'options' }));
  }, []);

  const goToRanks = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'ranks' }));
  }, []);

  const goToNextPiece = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'nextpiece' }));
  }, []);

  const moveLeft = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing' || !prev.currentPiece) return prev;
      const moved = { ...prev.currentPiece, x: prev.currentPiece.x - 1 };
      return isValidPosition(prev.board, moved) ? { ...prev, currentPiece: moved } : prev;
    });
  }, []);

  const moveRight = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing' || !prev.currentPiece) return prev;
      const moved = { ...prev.currentPiece, x: prev.currentPiece.x + 1 };
      return isValidPosition(prev.board, moved) ? { ...prev, currentPiece: moved } : prev;
    });
  }, []);

  const softDrop = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing' || !prev.currentPiece) return prev;
      const dropped = { ...prev.currentPiece, y: prev.currentPiece.y + 1 };
      if (isValidPosition(prev.board, dropped)) {
        return { ...prev, currentPiece: dropped, score: prev.score + 1 };
      }
      return processLock(prev, 1, false);
    });
  }, []);

  const hardDrop = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing' || !prev.currentPiece) return prev;
      const ghostY = getGhostY(prev.board, prev.currentPiece);
      const dropDistance = ghostY - prev.currentPiece.y;
      const hardDropped = { ...prev.currentPiece, y: ghostY };
      return processLock({ ...prev, currentPiece: hardDropped }, dropDistance, true);
    });
  }, []);

  const rotateCW = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing' || !prev.currentPiece) return prev;
      const rotated = tryRotate(prev.board, prev.currentPiece, 1);
      return rotated ? { ...prev, currentPiece: rotated } : prev;
    });
  }, []);

  const rotateCCW = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing' || !prev.currentPiece) return prev;
      const rotated = tryRotate(prev.board, prev.currentPiece, -1);
      return rotated ? { ...prev, currentPiece: rotated } : prev;
    });
  }, []);

  const holdPieceAction = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing' || !prev.currentPiece || !prev.canHold) return prev;
      const currentType = prev.currentPiece.type;
      const holdType = prev.holdPiece;
      if (holdType) {
        return {
          ...prev,
          currentPiece: spawnPiece(holdType),
          holdPiece: currentType,
          canHold: false,
        };
      }
      const nextType = prev.nextPieces[0];
      const remaining = prev.nextPieces.slice(1);
      const { queue: filledQueue, bag: newBag } = fillQueue(remaining, prev.bag);
      return {
        ...prev,
        currentPiece: spawnPiece(nextType),
        nextPieces: filledQueue,
        bag: newBag,
        holdPiece: currentType,
        canHold: false,
      };
    });
  }, []);

  const tick = useCallback(() => {
    setState(prev => tickGame(prev));
  }, []);

  const resetGame = useCallback(() => {
    setState(() => getInitialGameState(getHighScore()));
  }, []);

  const clearData = useCallback(() => {
    clearAllData();
    setState(() => getInitialGameState(0));
  }, []);

  // Test bridge & window.app exposure (AC-5)
  useEffect(() => {
    (window as unknown as Record<string, unknown>).advanceTime = (ms: number) => {
      setState(prev => {
        const interval = getDropInterval(prev.level);
        const steps = Math.max(1, Math.round(ms / interval));
        let current = prev;
        for (let i = 0; i < steps; i++) {
          current = tickGame(current);
        }
        return current;
      });
    };
    (window as unknown as Record<string, unknown>).render_game_to_text = () => {
      const s = stateRef.current;
      return JSON.stringify({
        mode: s.phase,
        board: s.board,
        currentPiece: s.currentPiece,
        nextPieces: s.nextPieces,
        holdPiece: s.holdPiece,
        score: s.score,
        level: s.level,
        lines: s.lines,
        highScore: s.highScore,
      });
    };
    (window as unknown as Record<string, unknown>).game = stateRef;
    (window as any).app = {
      get screen() { return stateRef.current.phase; },
      get score() { return stateRef.current.score; },
      get level() { return stateRef.current.level; },
      get lines() { return stateRef.current.lines; },
      get activePiece() { return stateRef.current.currentPiece; },
      get nextPiece() { return stateRef.current.nextPieces[0] ?? null; },
      get paused() { return stateRef.current.phase === 'paused'; },
      get gameOver() { return stateRef.current.phase === 'gameover'; },
      get storageStatus() {
        try {
          const test = '__tetris_storage_test__';
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return 'available';
        } catch {
          return 'unavailable';
        }
      },
      get lastError() { return null; },
      get status() { return stateRef.current.phase; },
    };
  }, []);

  const actions: GameActions = useMemo(() => ({
    startGame,
    pauseGame,
    resumeGame,
    goToMenu,
    goToControls,
    goToOptions,
    goToRanks,
    goToNextPiece,
    moveLeft,
    moveRight,
    softDrop,
    hardDrop,
    rotateCW,
    rotateCCW,
    holdPiece: holdPieceAction,
    tick,
    resetGame,
    clearData,
  }), [
    startGame,
    pauseGame,
    resumeGame,
    goToMenu,
    goToControls,
    goToOptions,
    goToRanks,
    goToNextPiece,
    moveLeft,
    moveRight,
    softDrop,
    hardDrop,
    rotateCW,
    rotateCCW,
    holdPieceAction,
    tick,
    resetGame,
    clearData,
  ]);

  return { state, actions };
}
