import { useAppContext } from './contexts/AppContext';
import {
  GameBoard,
  MainMenu,
  ControlsHelp,
  NextPiecePreview,
  GameOver,
  PauseOverlay,
  GameOptions,
} from './screens';
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
              // Settings saved via local state in future story
            },
            'revert-defaults-5': actions.resetGame,
            'clear-local-data-6': actions.clearData,
          }}
        />
      )}

      {phase === 'ranks' && (
        <NextPiecePreview
          actions={{
            'button-1-1': actions.goToControls,
            'button-2-2': actions.goToOptions,
          }}
        />
      )}
    </div>
  );
}
