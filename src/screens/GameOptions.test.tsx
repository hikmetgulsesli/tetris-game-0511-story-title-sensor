import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameOptions } from './GameOptions';
import { AppProvider } from '../contexts/AppContext';

describe('GameOptions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders header with title and action buttons', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    expect(screen.getByText('TETRIS.IO')).toBeInTheDocument();
    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('renders page header and settings sections', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    expect(screen.getByText('Game Settings')).toBeInTheDocument();
    expect(screen.getByText('Configure your terminal experience.')).toBeInTheDocument();
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.getByText('Starting Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Input Sensitivity')).toBeInTheDocument();
  });

  it('renders audio controls with default values', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    const masterVolume = screen.getByLabelText('Master Volume') as HTMLInputElement;
    const sfxVolume = screen.getByLabelText('Sound Effects') as HTMLInputElement;
    expect(masterVolume).toBeInTheDocument();
    expect(masterVolume.value).toBe('80');
    expect(sfxVolume).toBeInTheDocument();
    expect(sfxVolume.value).toBe('100');
  });

  it('updates range inputs on change', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    const masterVolume = screen.getByLabelText('Master Volume') as HTMLInputElement;
    fireEvent.change(masterVolume, { target: { value: '50' } });
    expect(masterVolume.value).toBe('50');

    const sfxVolume = screen.getByLabelText('Sound Effects') as HTMLInputElement;
    fireEvent.change(sfxVolume, { target: { value: '60' } });
    expect(sfxVolume.value).toBe('60');
  });

  it('toggles mute checkbox', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    const muteCheckbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    expect(muteCheckbox).toBeInTheDocument();
    expect(muteCheckbox.checked).toBe(false);
    fireEvent.click(muteCheckbox);
    expect(muteCheckbox.checked).toBe(true);
  });

  it('renders difficulty radio options with default selected', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    const easy = screen.getByDisplayValue('easy') as HTMLInputElement;
    const normal = screen.getByDisplayValue('normal') as HTMLInputElement;
    const hard = screen.getByDisplayValue('hard') as HTMLInputElement;

    expect(easy).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(hard).toBeInTheDocument();
    expect(normal.checked).toBe(true);
    expect(easy.checked).toBe(false);
    expect(hard.checked).toBe(false);
  });

  it('changes difficulty selection', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    const hard = screen.getByDisplayValue('hard') as HTMLInputElement;
    fireEvent.click(hard);
    expect(hard.checked).toBe(true);

    const easy = screen.getByDisplayValue('easy') as HTMLInputElement;
    fireEvent.click(easy);
    expect(easy.checked).toBe(true);
  });

  it('renders DAS and ARR range inputs with default values', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    const das = screen.getByLabelText('DAS (Delayed Auto Shift)') as HTMLInputElement;
    const arr = screen.getByLabelText('ARR (Auto Repeat Rate)') as HTMLInputElement;
    expect(das.value).toBe('133');
    expect(arr.value).toBe('10');
  });

  it('updates DAS and ARR values', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    const das = screen.getByLabelText('DAS (Delayed Auto Shift)') as HTMLInputElement;
    const arr = screen.getByLabelText('ARR (Auto Repeat Rate)') as HTMLInputElement;

    fireEvent.change(das, { target: { value: '200' } });
    expect(das.value).toBe('200');

    fireEvent.change(arr, { target: { value: '25' } });
    expect(arr.value).toBe('25');
  });

  it('renders action buttons', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );
    expect(screen.getByText('Save Configuration')).toBeInTheDocument();
    expect(screen.getByText('Revert Defaults')).toBeInTheDocument();
    expect(screen.getByText('Clear Local Data')).toBeInTheDocument();
    expect(screen.getByText('Danger Zone')).toBeInTheDocument();
  });

  it('calls action handlers on button clicks', () => {
    const mockActions = {
      'button-1-1': vi.fn(),
      'button-2-2': vi.fn(),
      'button-3-3': vi.fn(),
      'save-configuration-4': vi.fn(),
      'revert-defaults-5': vi.fn(),
      'clear-local-data-6': vi.fn(),
    };

    render(
      <AppProvider>
        <GameOptions actions={mockActions} />
      </AppProvider>
    );

    fireEvent.click(screen.getByLabelText('Menu'));
    expect(mockActions['button-1-1']).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Help'));
    expect(mockActions['button-2-2']).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Settings'));
    expect(mockActions['button-3-3']).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Save Configuration'));
    expect(mockActions['save-configuration-4']).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Revert Defaults'));
    expect(mockActions['revert-defaults-5']).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Clear Local Data'));
    expect(mockActions['clear-local-data-6']).toHaveBeenCalledTimes(1);
  });

  it('persists settings to localStorage on save', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );

    const masterVolume = screen.getByLabelText('Master Volume') as HTMLInputElement;
    fireEvent.change(masterVolume, { target: { value: '50' } });

    const hard = screen.getByDisplayValue('hard') as HTMLInputElement;
    fireEvent.click(hard);

    fireEvent.click(screen.getByText('Save Configuration'));

    const stored = JSON.parse(localStorage.getItem('tetris-settings')!);
    expect(stored.masterVolume).toBe(50);
    expect(stored.difficulty).toBe('hard');
  });

  it('loads saved settings from localStorage on mount', () => {
    localStorage.setItem('tetris-settings', JSON.stringify({
      masterVolume: 42,
      sfxVolume: 77,
      muteAll: true,
      difficulty: 'easy',
      das: 200,
      arr: 25,
    }));

    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );

    const masterVolume = screen.getByLabelText('Master Volume') as HTMLInputElement;
    expect(masterVolume.value).toBe('42');

    const easy = screen.getByDisplayValue('easy') as HTMLInputElement;
    expect(easy.checked).toBe(true);

    const muteCheckbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    expect(muteCheckbox.checked).toBe(true);
  });

  it('reverts to defaults when revert button clicked', () => {
    render(
      <AppProvider>
        <GameOptions />
      </AppProvider>
    );

    const masterVolume = screen.getByLabelText('Master Volume') as HTMLInputElement;
    fireEvent.change(masterVolume, { target: { value: '10' } });
    expect(masterVolume.value).toBe('10');

    fireEvent.click(screen.getByText('Revert Defaults'));
    expect(masterVolume.value).toBe('80');
  });
});
