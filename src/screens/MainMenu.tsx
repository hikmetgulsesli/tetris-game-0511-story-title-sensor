// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Main Menu
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Gamepad2, HelpCircle, Keyboard, LayoutGrid, Play, Plus, Settings, Trophy, User } from "lucide-react";
import { useAppContext } from '../contexts/AppContext';

export type MainMenuActionId = "button-1-1" | "button-2-2" | "resume-game-3" | "new-game-4" | "ranks-5" | "controls-6";

export interface MainMenuProps {
  actions?: Partial<Record<MainMenuActionId, () => void>>;
}

export function MainMenu({ actions }: MainMenuProps) {
  const { actions: appActions } = useAppContext();

  const handleNav = (e: React.MouseEvent, target: 'menu' | 'ranks' | 'controls' | 'options') => {
    e.preventDefault();
    switch (target) {
      case 'menu':
        appActions.goToMenu();
        break;
      case 'ranks':
        appActions.goToRanks();
        break;
      case 'controls':
        appActions.goToControls();
        break;
      case 'options':
        appActions.goToOptions();
        break;
    }
  };

  return (
    <>
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-touch-target bg-surface/95 backdrop-blur-sm border-b border-outline-variant dark:border-outline-variant">
        <div className="flex items-center gap-2">
          <button aria-label="Menu" className="flex items-center justify-center w-touch-target h-touch-target hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 transition-transform duration-100" type="button" onClick={() => appActions.goToMenu()}>
            <LayoutGrid className="text-primary" aria-hidden={true} focusable="false" />
          </button>
          <span className="text-headline-md font-headline-md font-bold tracking-tighter text-primary uppercase">TETRIS.IO</span>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Help" className="text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 p-2 rounded-full active:scale-95 transition-transform duration-100 flex items-center justify-center h-touch-target w-touch-target" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
            <HelpCircle aria-hidden={true} focusable="false" />
          </button>
          <button aria-label="Settings" className="text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 p-2 rounded-full active:scale-95 transition-transform duration-100 flex items-center justify-center h-touch-target w-touch-target" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
            <Settings aria-hidden={true} focusable="false" />
          </button>
        </div>
      </header>
      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center pt-20 pb-20 relative bg-grid w-full max-w-[1200px] mx-auto px-container-padding">
        {/* Decorative Tetromino Elements (Background) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
          {/* Simulated falling pieces using absolute positioning and simple shapes */}
          <div className="absolute top-[20%] left-[10%] text-primary/30">
            <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
            <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
            <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
            <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
          </div>
          <div className="absolute top-[50%] right-[15%] text-primary/30 flex">
            <div>
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
            </div>
            <div>
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)] mt-8"></div>
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
            </div>
          </div>
          <div className="absolute bottom-[20%] left-[25%] text-primary/30 flex flex-col">
            <div className="flex">
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
              <div className="w-8 h-8 border border-outline-variant bg-surface-container shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"></div>
            </div>
          </div>
        </div>
        {/* Logo Container */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-[72px] md:text-[96px] font-display-lg text-primary tracking-tighter leading-none mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] uppercase">
            TETRIS
          </h1>
          <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest">
            High Performance Core
          </p>
        </div>
        {/* Action Menu */}
        <div className="w-full max-w-[400px] flex flex-col gap-4 relative z-10">
          {/* Resume (Primary Action) */}
          <button className="group relative flex items-center justify-center w-full h-touch-target bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider overflow-hidden hover:bg-opacity-90 transition-colors duration-200" type="button" data-action-id="resume-game-3" onClick={actions?.["resume-game-3"]}>
            <div className="absolute inset-0 border border-primary/20 pointer-events-none group-hover:border-primary/50 transition-colors"></div>
            <div className="absolute inset-y-0 left-0 w-1 bg-surface-container-highest group-hover:w-2 transition-colors"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Play className="text-[18px]" aria-hidden={true} focusable="false" />
              Resume Game
            </span>
          </button>
          {/* Start New Game */}
          <button className="group relative flex items-center justify-center w-full h-touch-target bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high hover:border-outline transition-colors duration-200" type="button" data-action-id="new-game-4" onClick={actions?.["new-game-4"]}>
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="text-[18px]" aria-hidden={true} focusable="false" />
              New Game
            </span>
          </button>
          {/* Leaderboard / Ranks */}
          <button className="group relative flex items-center justify-center w-full h-touch-target bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high hover:border-outline transition-colors duration-200" type="button" data-action-id="ranks-5" onClick={actions?.["ranks-5"]}>
            <span className="relative z-10 flex items-center gap-2">
              <Trophy className="text-[18px]" aria-hidden={true} focusable="false" />
              Ranks
            </span>
          </button>
          {/* Controls */}
          <button className="group relative flex items-center justify-center w-full h-touch-target bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high hover:border-outline transition-colors duration-200" type="button" data-action-id="controls-6" onClick={actions?.["controls-6"]}>
            <span className="relative z-10 flex items-center gap-2">
              <Keyboard className="text-[18px]" aria-hidden={true} focusable="false" />
              Controls
            </span>
          </button>
        </div>
        {/* System Stats / Footer Info */}
        <div className="absolute bottom-24 w-full flex justify-between px-container-padding text-label-sm font-label-sm text-on-surface-variant/50 uppercase">
          <span>v2.4.1 [Stable]</span>
          <span>Ping: 12ms</span>
        </div>
      </main>
      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[56px] bg-surface dark:bg-surface border-t border-outline-variant dark:border-outline-variant">
        <a className="flex flex-col items-center justify-center text-on-primary bg-primary rounded-none w-full h-full border-t-2 border-primary active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'menu')}>
          <Gamepad2 aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Battle</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'ranks')}>
          <Trophy aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Ranks</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'controls')}>
          <Keyboard aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Controls</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'options')}>
          <User aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Account</span>
        </a>
      </nav>
    </>
  );
}
