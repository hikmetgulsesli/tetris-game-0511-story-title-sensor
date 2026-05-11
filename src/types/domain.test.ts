import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  getPieceCells,
  isValidPosition,
  lockPiece,
  clearLines,
  calculateScore,
  getDropInterval,
  getGhostY,
  tryRotate,
  shuffleBag,
  fillQueue,
  spawnPiece,
  getInitialGameState,
  isGameOver,
  processLock,
  tickGame,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  type TetrominoType,
} from './domain';

describe('domain', () => {
  describe('createEmptyBoard', () => {
    it('creates a 10x20 board of nulls', () => {
      const board = createEmptyBoard();
      expect(board.length).toBe(BOARD_HEIGHT);
      expect(board[0].length).toBe(BOARD_WIDTH);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });
  });

  describe('getPieceCells', () => {
    it('returns correct cells for O piece at origin', () => {
      const piece = { type: 'O' as TetrominoType, x: 0, y: 0, rotation: 0 };
      const cells = getPieceCells(piece);
      expect(cells).toEqual([
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ]);
    });
  });

  describe('isValidPosition', () => {
    it('allows position within empty board', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as TetrominoType, x: 0, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(true);
    });

    it('rejects position off right edge', () => {
      const board = createEmptyBoard();
      const piece = { type: 'I' as TetrominoType, x: 8, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });

    it('rejects position off bottom edge', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as TetrominoType, x: 0, y: 19, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });

    it('allows position above board', () => {
      const board = createEmptyBoard();
      const piece = { type: 'I' as TetrominoType, x: 0, y: -1, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(true);
    });

    it('rejects position overlapping locked piece', () => {
      const board = createEmptyBoard();
      board[5][5] = 'T';
      const piece = { type: 'O' as TetrominoType, x: 4, y: 4, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });
  });

  describe('lockPiece', () => {
    it('locks piece cells to board', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as TetrominoType, x: 0, y: 0, rotation: 0 };
      const newBoard = lockPiece(board, piece);
      expect(newBoard[0][1]).toBe('O');
      expect(newBoard[0][2]).toBe('O');
      expect(newBoard[1][1]).toBe('O');
      expect(newBoard[1][2]).toBe('O');
    });
  });

  describe('clearLines', () => {
    it('clears a full line', () => {
      const board = createEmptyBoard();
      board[19] = Array(BOARD_WIDTH).fill('I');
      const result = clearLines(board);
      expect(result.linesCleared).toBe(1);
      expect(result.board[19].every(c => c === null)).toBe(true);
    });

    it('clears multiple full lines', () => {
      const board = createEmptyBoard();
      board[18] = Array(BOARD_WIDTH).fill('I');
      board[19] = Array(BOARD_WIDTH).fill('O');
      const result = clearLines(board);
      expect(result.linesCleared).toBe(2);
    });

    it('does not clear partial lines', () => {
      const board = createEmptyBoard();
      board[19][0] = 'I';
      const result = clearLines(board);
      expect(result.linesCleared).toBe(0);
      expect(result.board[19][0]).toBe('I');
    });
  });

  describe('calculateScore', () => {
    it('returns 0 for 0 lines', () => {
      expect(calculateScore(0, 1, false, 0)).toBe(0);
    });

    it('returns 100 * level for 1 line', () => {
      expect(calculateScore(1, 2, false, 0)).toBe(200);
    });

    it('returns 800 * level for 4 lines (Tetris)', () => {
      expect(calculateScore(4, 1, false, 0)).toBe(800);
    });

    it('adds drop distance for soft drop', () => {
      expect(calculateScore(0, 1, false, 5)).toBe(5);
    });

    it('adds 2x drop distance for hard drop', () => {
      expect(calculateScore(0, 1, true, 5)).toBe(10);
    });
  });

  describe('getDropInterval', () => {
    it('returns 1000ms for level 1', () => {
      expect(getDropInterval(1)).toBe(1000);
    });

    it('returns faster interval for higher levels', () => {
      expect(getDropInterval(2)).toBeLessThan(1000);
    });

    it('caps at 50ms', () => {
      expect(getDropInterval(100)).toBe(50);
    });
  });

  describe('getGhostY', () => {
    it('returns same y when already on ground', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as TetrominoType, x: 0, y: 18, rotation: 0 };
      expect(getGhostY(board, piece)).toBe(18);
    });

    it('returns lower y when piece can drop', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as TetrominoType, x: 0, y: 0, rotation: 0 };
      expect(getGhostY(board, piece)).toBe(18);
    });
  });

  describe('tryRotate', () => {
    it('rotates piece when valid', () => {
      const board = createEmptyBoard();
      const piece = { type: 'T' as TetrominoType, x: 3, y: 5, rotation: 0 };
      const rotated = tryRotate(board, piece, 1);
      expect(rotated).not.toBeNull();
      expect(rotated!.rotation).toBe(1);
    });

    it('applies wall kick when needed', () => {
      const board = createEmptyBoard();
      const piece = { type: 'T' as TetrominoType, x: -1, y: 5, rotation: 0 };
      const rotated = tryRotate(board, piece, 1);
      expect(rotated).not.toBeNull();
    });

    it('returns null when no valid rotation found', () => {
      const board = createEmptyBoard();
      // Fill the board around the piece so it can't rotate
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
          if (x !== 3 || y !== 5) board[y][x] = 'I';
        }
      }
      const piece = { type: 'T' as TetrominoType, x: 3, y: 5, rotation: 0 };
      const rotated = tryRotate(board, piece, 1);
      expect(rotated).toBeNull();
    });
  });

  describe('shuffleBag', () => {
    it('returns all 7 tetrominoes', () => {
      const bag = shuffleBag();
      expect(bag.length).toBe(7);
      expect(new Set(bag).size).toBe(7);
    });
  });

  describe('fillQueue', () => {
    it('fills queue to 5 pieces', () => {
      const result = fillQueue([], []);
      expect(result.queue.length).toBe(5);
    });

    it('preserves existing queue pieces', () => {
      const result = fillQueue(['I', 'O'], []);
      expect(result.queue.length).toBe(5);
      expect(result.queue[0]).toBe('I');
      expect(result.queue[1]).toBe('O');
    });
  });

  describe('spawnPiece', () => {
    it('spawns at x=3, y=0, rotation=0', () => {
      const piece = spawnPiece('T');
      expect(piece.x).toBe(3);
      expect(piece.y).toBe(0);
      expect(piece.rotation).toBe(0);
    });
  });

  describe('getInitialGameState', () => {
    it('returns menu phase', () => {
      const state = getInitialGameState();
      expect(state.phase).toBe('menu');
    });

    it('has empty board', () => {
      const state = getInitialGameState();
      expect(state.board.every(row => row.every(c => c === null))).toBe(true);
    });

    it('has current piece', () => {
      const state = getInitialGameState();
      expect(state.currentPiece).not.toBeNull();
    });

    it('has 5 next pieces', () => {
      const state = getInitialGameState();
      expect(state.nextPieces.length).toBe(5);
    });

    it('accepts high score', () => {
      const state = getInitialGameState(5000);
      expect(state.highScore).toBe(5000);
    });
  });

  describe('isGameOver', () => {
    it('returns false for valid spawn', () => {
      const board = createEmptyBoard();
      const piece = spawnPiece('I');
      expect(isGameOver(board, piece)).toBe(false);
    });

    it('returns true when spawn is blocked', () => {
      const board = createEmptyBoard();
      // Block the spawn area for I piece (spawns at y=0, cells at y=1)
      board[1][3] = 'Z';
      board[1][4] = 'Z';
      board[1][5] = 'Z';
      board[1][6] = 'Z';
      const piece = spawnPiece('I');
      expect(isGameOver(board, piece)).toBe(true);
    });
  });

  describe('tickGame', () => {
    it('drops piece by 1 when valid', () => {
      const state = getInitialGameState();
      const initialY = state.currentPiece!.y;
      const next = tickGame({ ...state, phase: 'playing' });
      expect(next.currentPiece!.y).toBe(initialY + 1);
    });

    it('locks piece when at bottom', () => {
      const state = getInitialGameState();
      const piece = { ...state.currentPiece!, y: 18 };
      const next = tickGame({ ...state, phase: 'playing', currentPiece: piece });
      expect(next.currentPiece).not.toBeNull();
      expect(next.board.some(row => row.some(c => c !== null))).toBe(true);
    });

    it('does nothing when not playing', () => {
      const state = getInitialGameState();
      const next = tickGame(state);
      expect(next).toEqual(state);
    });
  });

  describe('processLock', () => {
    it('spawns next piece after lock', () => {
      const state = getInitialGameState();
      // Place current piece near bottom so it doesn't block spawn
      const piece = { ...state.currentPiece!, y: 18 };
      const next = processLock({ ...state, phase: 'playing', currentPiece: piece });
      expect(next.currentPiece).not.toBeNull();
      expect(next.nextPieces.length).toBe(5);
    });

    it('clears lines and updates score', () => {
      const state = getInitialGameState();
      // Create a full line at bottom
      const board = createEmptyBoard();
      board[19] = Array(BOARD_WIDTH).fill('I');
      const piece = { ...state.currentPiece!, y: 17 };
      const next = processLock({ ...state, phase: 'playing', board, currentPiece: piece });
      expect(next.lines).toBeGreaterThan(0);
      expect(next.score).toBeGreaterThan(0);
    });
  });
});
