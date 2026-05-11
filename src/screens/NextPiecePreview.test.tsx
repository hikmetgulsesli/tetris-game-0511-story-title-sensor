import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextPiecePreview } from './NextPiecePreview';
import { AppProvider } from '../contexts/AppContext';

describe('NextPiecePreview', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders header with title and action buttons', () => {
    render(
      <AppProvider>
        <NextPiecePreview />
      </AppProvider>
    );
    expect(screen.getByText('TETRIS.IO')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('renders sequence queue panel with live badge', () => {
    render(
      <AppProvider>
        <NextPiecePreview />
      </AppProvider>
    );
    expect(screen.getByText('Sequence Queue')).toBeInTheDocument();
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('renders next pieces from game state', () => {
    render(
      <AppProvider>
        <NextPiecePreview />
      </AppProvider>
    );
    expect(screen.getByText('INCOMING')).toBeInTheDocument();
    expect(screen.getByText('+1 SEQUENCE')).toBeInTheDocument();
    expect(screen.getByText('+2 SEQUENCE')).toBeInTheDocument();
  });

  it('renders engine data section', () => {
    render(
      <AppProvider>
        <NextPiecePreview />
      </AppProvider>
    );
    expect(screen.getByText('Engine Data')).toBeInTheDocument();
    expect(screen.getByText('RNG Seed')).toBeInTheDocument();
    expect(screen.getByText('Queue Depth')).toBeInTheDocument();
    expect(screen.getByText('Algorithm')).toBeInTheDocument();
    expect(screen.getByText('7-Bag')).toBeInTheDocument();
  });

  it('renders bias check section', () => {
    render(
      <AppProvider>
        <NextPiecePreview />
      </AppProvider>
    );
    expect(screen.getByText('Bias Check')).toBeInTheDocument();
  });

  it('calls action handlers on button clicks', () => {
    const mockActions = {
      'button-1-1': vi.fn(),
      'button-2-2': vi.fn(),
    };

    render(
      <AppProvider>
        <NextPiecePreview actions={mockActions} />
      </AppProvider>
    );

    const helpBtn = screen.getByLabelText('Help');
    fireEvent.click(helpBtn);
    expect(mockActions['button-1-1']).toHaveBeenCalledTimes(1);

    const settingsBtn = screen.getByLabelText('Settings');
    fireEvent.click(settingsBtn);
    expect(mockActions['button-2-2']).toHaveBeenCalledTimes(1);
  });
});
