import { useAppContext } from './contexts/AppContext';
import {
  GameBoard,
  MainMenu,
  ControlsHelp,
  GameOver,
  PauseOverlay,
  GameOptions,
} from './screens';
import { getHighScores } from './utils/storage';
import './App.css';

export default function App() {
  const { state, actions } = useAppContext();
  const phase = state.phase;

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {phase === 'menu' && (
        <MainMenu
          actions={{
            'button-1-1': actions.goToControls,
            'button-2-2': actions.goToOptions,
            'resume-game-3': actions.resumeGame,
            'new-game-4': actions.startGame,
            'ranks-5': actions.goToRanks,
            'controls-6': actions.goToControls,
          }}
        />
      )}

      {phase === 'playing' && (
        <GameBoard
          actions={{
            'button-1-1': actions.goToControls,
            'button-2-2': actions.goToOptions,
            'button-3-3': actions.moveLeft,
            'button-4-4': actions.softDrop,
            'button-5-5': actions.moveRight,
            'button-6-6': actions.rotateCW,
            'button-7-7': actions.hardDrop,
            'pause-esc-8': actions.pauseGame,
          }}
        />
      )}

      {phase === 'paused' && (
        <>
          <GameBoard
            actions={{
              'button-1-1': actions.goToControls,
              'button-2-2': actions.goToOptions,
              'button-3-3': actions.moveLeft,
              'button-4-4': actions.softDrop,
              'button-5-5': actions.moveRight,
              'button-6-6': actions.rotateCW,
              'button-7-7': actions.hardDrop,
              'pause-esc-8': actions.pauseGame,
            }}
          />
          <div className="fixed inset-0 z-50">
            <PauseOverlay
              actions={{
                'resume-game-1': actions.resumeGame,
                'restart-2': actions.startGame,
                'main-menu-3': actions.goToMenu,
              }}
            />
          </div>
        </>
      )}

      {phase === 'gameover' && (
        <>
          <GameBoard
            actions={{
              'button-1-1': actions.goToControls,
              'button-2-2': actions.goToOptions,
              'button-3-3': actions.moveLeft,
              'button-4-4': actions.softDrop,
              'button-5-5': actions.moveRight,
              'button-6-6': actions.rotateCW,
              'button-7-7': actions.hardDrop,
              'pause-esc-8': actions.pauseGame,
            }}
          />
          <div className="fixed inset-0 z-50 flex flex-col">
            <GameOver
              actions={{
                'play-again-1': actions.startGame,
                'return-to-menu-2': actions.goToMenu,
              }}
            />
          </div>
        </>
      )}

      {phase === 'controls' && <ControlsHelp />}

      {phase === 'options' && (
        <GameOptions
          actions={{
            'button-1-1': actions.goToMenu,
            'button-2-2': actions.goToControls,
            'button-3-3': actions.goToOptions,
            'save-configuration-4': () => {
              // Settings are saved via local state in GameOptions; this is a no-op callback
            },
            'revert-defaults-5': actions.resetGame,
            'clear-local-data-6': actions.clearData,
          }}
        />
      )}

      {phase === 'ranks' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md rounded-xl border border-surface/20 bg-surface p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-on-surface">Leaderboard</h2>
            <div className="space-y-3">
              {getHighScores().length === 0 && (
                <p className="text-center text-on-surface/60">No scores yet.</p>
              )}
              {getHighScores().map((entry, i) => (
                <div
                  key={`${entry.date}-${i}`}
                  className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3"
                >
                  <span className="font-medium text-on-surface">
                    #{i + 1} — {entry.score} pts
                  </span>
                  <span className="text-sm text-on-surface/60">
                    Level {entry.level} / {entry.lines} lines
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={actions.goToMenu}
              className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-semibold text-on-primary transition hover:opacity-90"
            >
              Main Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
