import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MainMenu } from './MainMenu';

describe('MainMenu', () => {
  it('renders title and menu buttons', () => {
    render(<MainMenu />);
    expect(screen.getByText('TETRIS')).toBeInTheDocument();
    expect(screen.getByText('Resume Game')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
    expect(screen.getByText('High Performance Core')).toBeInTheDocument();
  });

  it('calls action handlers on button clicks', () => {
    const mockActions = {
      'resume-game-3': vi.fn(),
      'new-game-4': vi.fn(),
      'ranks-5': vi.fn(),
      'controls-6': vi.fn(),
      'button-1-1': vi.fn(),
      'button-2-2': vi.fn(),
    };

    render(<MainMenu actions={mockActions} />);

    fireEvent.click(screen.getByText('Resume Game'));
    expect(mockActions['resume-game-3']).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('New Game'));
    expect(mockActions['new-game-4']).toHaveBeenCalledTimes(1);

    // Use role to target the main menu buttons, not bottom nav links
    const menuButtons = screen.getAllByRole('button');
    const ranksButton = menuButtons.find((b) => b.textContent?.includes('Ranks'));
    const controlsButton = menuButtons.find((b) => b.textContent?.includes('Controls'));

    expect(ranksButton).toBeDefined();
    expect(controlsButton).toBeDefined();

    if (ranksButton) fireEvent.click(ranksButton);
    expect(mockActions['ranks-5']).toHaveBeenCalledTimes(1);

    if (controlsButton) fireEvent.click(controlsButton);
    expect(mockActions['controls-6']).toHaveBeenCalledTimes(1);
  });
});
