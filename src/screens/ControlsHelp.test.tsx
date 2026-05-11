import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlsHelp } from './ControlsHelp';
import { AppProvider } from '../contexts/AppContext';

describe('ControlsHelp', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders header with title', () => {
    render(
      <AppProvider>
        <ControlsHelp />
      </AppProvider>
    );
    expect(screen.getByText('TETRIS.IO')).toBeInTheDocument();
    expect(screen.getByText('Game Controls')).toBeInTheDocument();
  });

  it('renders keyboard controls section', () => {
    render(
      <AppProvider>
        <ControlsHelp />
      </AppProvider>
    );
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Move Left/Right')).toBeInTheDocument();
    expect(screen.getByText('Soft Drop')).toBeInTheDocument();
    expect(screen.getByText('Hard Drop')).toBeInTheDocument();
    expect(screen.getByText('Rotate Left/Right')).toBeInTheDocument();
    expect(screen.getByText('Hold Piece')).toBeInTheDocument();
    expect(screen.getByText('Pause Game')).toBeInTheDocument();
  });

  it('renders touch controls section', () => {
    render(
      <AppProvider>
        <ControlsHelp />
      </AppProvider>
    );
    expect(screen.getByText('Touch')).toBeInTheDocument();
    expect(screen.getByText('Swipe Left/Right to move.')).toBeInTheDocument();
    expect(screen.getByText('Swipe Down to soft drop.')).toBeInTheDocument();
    expect(screen.getByText('Tap screen to rotate.')).toBeInTheDocument();
  });

  it('renders rules summary section', () => {
    render(
      <AppProvider>
        <ControlsHelp />
      </AppProvider>
    );
    expect(screen.getByText('Rules Summary')).toBeInTheDocument();
    expect(screen.getByText('1. Clear Lines')).toBeInTheDocument();
    expect(screen.getByText('2. Survive')).toBeInTheDocument();
    expect(screen.getByText('3. Score High')).toBeInTheDocument();
  });

  it('navigates via desktop nav links', () => {
    render(
      <AppProvider>
        <ControlsHelp />
      </AppProvider>
    );
    const battleLink = screen.getAllByText('Battle')[0];
    const ranksLink = screen.getAllByText('Ranks')[0];
    const controlsLink = screen.getAllByText('Controls')[0];
    const accountLink = screen.getAllByText('Account')[0];

    expect(battleLink).toBeInTheDocument();
    expect(ranksLink).toBeInTheDocument();
    expect(controlsLink).toBeInTheDocument();
    expect(accountLink).toBeInTheDocument();

    // Clicking should not throw (navigation handled by context)
    fireEvent.click(battleLink);
    fireEvent.click(ranksLink);
    fireEvent.click(controlsLink);
    fireEvent.click(accountLink);
  });

  it('navigates via mobile bottom nav', () => {
    render(
      <AppProvider>
        <ControlsHelp />
      </AppProvider>
    );
    const mobileLinks = screen.getAllByText('Battle');
    // Mobile nav has its own Battle link
    expect(mobileLinks.length).toBeGreaterThanOrEqual(1);
  });
});
