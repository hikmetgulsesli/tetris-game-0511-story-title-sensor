import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameBoard } from './GameBoard';
import { AppProvider } from '../contexts/AppContext';

describe('GameBoard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders score, level, and lines from game state', () => {
    render(
      <AppProvider>
        <GameBoard />
      </AppProvider>
    );
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
    // Score should be zero-padded 7 digits initially
    expect(screen.getByText('0000000')).toBeInTheDocument();
    // Level should be zero-padded 2 digits
    expect(screen.getByText('01')).toBeInTheDocument();
    // Lines should be zero-padded 3 digits
    expect(screen.getByText('000')).toBeInTheDocument();
  });

  it('renders next piece preview', () => {
    render(
      <AppProvider>
        <GameBoard />
      </AppProvider>
    );
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders hold area', () => {
    render(
      <AppProvider>
        <GameBoard />
      </AppProvider>
    );
    expect(screen.getByText('Hold')).toBeInTheDocument();
    expect(screen.getByText('EMPTY')).toBeInTheDocument();
  });

  it('calls action handlers on button clicks', () => {
    const mockActions = {
      'button-3-3': vi.fn(),
      'button-4-4': vi.fn(),
      'button-5-5': vi.fn(),
      'button-6-6': vi.fn(),
      'button-7-7': vi.fn(),
      'pause-esc-8': vi.fn(),
    };

    render(
      <AppProvider>
        <GameBoard actions={mockActions} />
      </AppProvider>
    );

    // Pause button
    const pauseBtn = screen.getByText('Pause (Esc)');
    fireEvent.click(pauseBtn);
    expect(mockActions['pause-esc-8']).toHaveBeenCalledTimes(1);
  });

  it('renders playing status', () => {
    render(
      <AppProvider>
        <GameBoard />
      </AppProvider>
    );
    expect(screen.getByText('Playing')).toBeInTheDocument();
  });
});
