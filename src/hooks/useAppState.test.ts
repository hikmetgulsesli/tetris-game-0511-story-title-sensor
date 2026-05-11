import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppState } from './useAppState';
import { clearAllData } from '../utils/storage';

describe('useAppState', () => {
  beforeEach(() => {
    clearAllData();
  });

  it('starts in playing phase', () => {
    const { result } = renderHook(() => useAppState());
    expect(result.current.state.phase).toBe('playing');
  });

  it('starts game transitions to playing', () => {
    const { result } = renderHook(() => useAppState());
    act(() => {
      result.current.actions.startGame();
    });
    expect(result.current.state.phase).toBe('playing');
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.level).toBe(1);
  });

  it('pauses game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    act(() => result.current.actions.pauseGame());
    expect(result.current.state.phase).toBe('paused');
  });

  it('resumes game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    act(() => result.current.actions.pauseGame());
    act(() => result.current.actions.resumeGame());
    expect(result.current.state.phase).toBe('playing');
  });

  it('moves piece left', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    const initialX = result.current.state.currentPiece!.x;
    act(() => result.current.actions.moveLeft());
    expect(result.current.state.currentPiece!.x).toBe(initialX - 1);
  });

  it('moves piece right', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    const initialX = result.current.state.currentPiece!.x;
    act(() => result.current.actions.moveRight());
    expect(result.current.state.currentPiece!.x).toBe(initialX + 1);
  });

  it('soft drops piece', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    const initialY = result.current.state.currentPiece!.y;
    act(() => result.current.actions.softDrop());
    expect(result.current.state.currentPiece!.y).toBe(initialY + 1);
    expect(result.current.state.score).toBe(1);
  });

  it('hard drops piece to bottom', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    act(() => result.current.actions.hardDrop());
    // After hard drop, piece is locked and new piece spawned
    expect(result.current.state.board.some(row => row.some(c => c !== null))).toBe(true);
    expect(result.current.state.currentPiece).not.toBeNull();
  });

  it('rotates piece clockwise', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    const initialRotation = result.current.state.currentPiece!.rotation;
    act(() => result.current.actions.rotateCW());
    // O-piece has only one rotation state
    if (result.current.state.currentPiece!.type !== 'O') {
      expect(result.current.state.currentPiece!.rotation).not.toBe(initialRotation);
    }
  });

  it('rotates piece counter-clockwise', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    act(() => result.current.actions.rotateCW());
    const afterCW = result.current.state.currentPiece!.rotation;
    act(() => result.current.actions.rotateCCW());
    // O-piece has only one rotation state
    if (result.current.state.currentPiece!.type !== 'O') {
      expect(result.current.state.currentPiece!.rotation).not.toBe(afterCW);
    }
  });

  it('holds piece', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    const currentType = result.current.state.currentPiece!.type;
    act(() => result.current.actions.holdPiece());
    expect(result.current.state.holdPiece).toBe(currentType);
    expect(result.current.state.canHold).toBe(false);
  });

  it('tick drops piece', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    const initialY = result.current.state.currentPiece!.y;
    act(() => result.current.actions.tick());
    expect(result.current.state.currentPiece!.y).toBe(initialY + 1);
  });

  it('navigates to controls', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.goToControls());
    expect(result.current.state.phase).toBe('controls');
  });

  it('navigates to options', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.goToOptions());
    expect(result.current.state.phase).toBe('options');
  });

  it('navigates to ranks', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.goToRanks());
    expect(result.current.state.phase).toBe('ranks');
  });

  it('navigates to menu', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    act(() => result.current.actions.goToMenu());
    expect(result.current.state.phase).toBe('menu');
  });

  it('resets game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    act(() => result.current.actions.hardDrop());
    act(() => result.current.actions.resetGame());
    expect(result.current.state.phase).toBe('playing');
    expect(result.current.state.score).toBe(0);
  });

  it('exposes test bridge on window', () => {
    renderHook(() => useAppState());
    expect(typeof (window as any).render_game_to_text).toBe('function');
    expect(typeof (window as any).advanceTime).toBe('function');
    expect((window as any).game).toBeDefined();
    expect((window as any).app).toBeDefined();
    expect(typeof (window as any).app.screen).toBe('string');
    expect(typeof (window as any).app.score).toBe('number');
  });

  it('render_game_to_text returns valid JSON', () => {
    renderHook(() => useAppState());
    const json = (window as any).render_game_to_text();
    const parsed = JSON.parse(json);
    expect(parsed.mode).toBe('playing');
    expect(parsed.score).toBe(0);
    expect(Array.isArray(parsed.board)).toBe(true);
  });

  it('advanceTime advances game state', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.startGame());
    const initialY = result.current.state.currentPiece!.y;
    act(() => {
      (window as any).advanceTime(2000);
    });
    expect(result.current.state.currentPiece!.y).toBeGreaterThan(initialY);
  });

  it('app.status reflects current phase', () => {
    const { result } = renderHook(() => useAppState());
    expect((window as any).app.status).toBe('playing');
    act(() => result.current.actions.pauseGame());
    expect((window as any).app.status).toBe('paused');
  });

  it('navigates to nextpiece', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.actions.goToNextPiece());
    expect(result.current.state.phase).toBe('nextpiece');
  });
});
