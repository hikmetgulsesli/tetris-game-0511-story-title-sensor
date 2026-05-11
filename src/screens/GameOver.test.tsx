import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameOver } from './GameOver';
import { AppProvider } from '../contexts/AppContext';

describe('GameOver', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders game over header and message', () => {
    render(
      <AppProvider>
        <GameOver />
      </AppProvider>
    );
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText('Block out! No more space available.')).toBeInTheDocument();
  });

  it('renders final score, level reached, and lines cleared from game state', () => {
    render(
      <AppProvider>
        <GameOver />
      </AppProvider>
    );
    expect(screen.getByText('Final Score')).toBeInTheDocument();
    expect(screen.getByText('Level Reached')).toBeInTheDocument();
    expect(screen.getByText('Lines Cleared')).toBeInTheDocument();
    // Initial state: score=0, level=1, lines=0
    // Score and lines are both 0, so we expect at least two '0' elements
    expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders play again and return to menu buttons', () => {
    render(
      <AppProvider>
        <GameOver />
      </AppProvider>
    );
    expect(screen.getByText('Play Again')).toBeInTheDocument();
    expect(screen.getByText('Return to Menu')).toBeInTheDocument();
  });

  it('calls play again action handler on button click', () => {
    const mockPlayAgain = vi.fn();
    const mockReturnToMenu = vi.fn();

    render(
      <AppProvider>
        <GameOver
          actions={{
            'play-again-1': mockPlayAgain,
            'return-to-menu-2': mockReturnToMenu,
          }}
        />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Play Again'));
    expect(mockPlayAgain).toHaveBeenCalledTimes(1);
  });

  it('calls return to menu action handler on button click', () => {
    const mockPlayAgain = vi.fn();
    const mockReturnToMenu = vi.fn();

    render(
      <AppProvider>
        <GameOver
          actions={{
            'play-again-1': mockPlayAgain,
            'return-to-menu-2': mockReturnToMenu,
          }}
        />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Return to Menu'));
    expect(mockReturnToMenu).toHaveBeenCalledTimes(1);
  });

  it('renders high score text when score is not a new best', () => {
    render(
      <AppProvider>
        <GameOver />
      </AppProvider>
    );
    // With initial score of 0, it should show high score text
    expect(screen.getByText(/High Score:/)).toBeInTheDocument();
  });
});
