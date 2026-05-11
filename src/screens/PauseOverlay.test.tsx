import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PauseOverlay } from './PauseOverlay';
import { AppProvider } from '../contexts/AppContext';

describe('PauseOverlay', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders paused header and current score', () => {
    render(
      <AppProvider>
        <PauseOverlay />
      </AppProvider>
    );
    expect(screen.getByText('Paused')).toBeInTheDocument();
    expect(screen.getByText(/Current Score:/)).toBeInTheDocument();
  });

  it('renders resume, restart, and main menu buttons', () => {
    render(
      <AppProvider>
        <PauseOverlay />
      </AppProvider>
    );
    expect(screen.getByText('Resume Game')).toBeInTheDocument();
    expect(screen.getByText('Restart')).toBeInTheDocument();
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
  });

  it('calls resume game action handler on button click', () => {
    const mockResume = vi.fn();
    const mockRestart = vi.fn();
    const mockMainMenu = vi.fn();

    render(
      <AppProvider>
        <PauseOverlay
          actions={{
            'resume-game-1': mockResume,
            'restart-2': mockRestart,
            'main-menu-3': mockMainMenu,
          }}
        />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Resume Game'));
    expect(mockResume).toHaveBeenCalledTimes(1);
  });

  it('calls restart action handler on button click', () => {
    const mockResume = vi.fn();
    const mockRestart = vi.fn();
    const mockMainMenu = vi.fn();

    render(
      <AppProvider>
        <PauseOverlay
          actions={{
            'resume-game-1': mockResume,
            'restart-2': mockRestart,
            'main-menu-3': mockMainMenu,
          }}
        />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Restart'));
    expect(mockRestart).toHaveBeenCalledTimes(1);
  });

  it('calls main menu action handler on button click', () => {
    const mockResume = vi.fn();
    const mockRestart = vi.fn();
    const mockMainMenu = vi.fn();

    render(
      <AppProvider>
        <PauseOverlay
          actions={{
            'resume-game-1': mockResume,
            'restart-2': mockRestart,
            'main-menu-3': mockMainMenu,
          }}
        />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Main Menu'));
    expect(mockMainMenu).toHaveBeenCalledTimes(1);
  });

  it('renders esc helper text', () => {
    render(
      <AppProvider>
        <PauseOverlay />
      </AppProvider>
    );
    expect(screen.getByText('Press ESC to resume')).toBeInTheDocument();
  });
});
