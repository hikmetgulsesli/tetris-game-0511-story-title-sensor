// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Controls Help
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronsDown,
  Gamepad2,
  HelpCircle,
  Keyboard,
  LayoutGrid,
  MoveDown,
  MoveLeft,
  MousePointer,
  RotateCw,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import { useAppContext } from '../contexts/AppContext';

export type ControlsHelpActionId = never;

export interface ControlsHelpProps {
  actions?: Partial<Record<ControlsHelpActionId, () => void>>;
}

export function ControlsHelp(_props: ControlsHelpProps) {
  const { actions } = useAppContext();

  const handleNav = (e: React.MouseEvent, target: 'menu' | 'ranks' | 'controls' | 'options') => {
    e.preventDefault();
    switch (target) {
      case 'menu':
        actions.goToMenu();
        break;
      case 'ranks':
        actions.goToRanks();
        break;
      case 'controls':
        actions.goToControls();
        break;
      case 'options':
        actions.goToOptions();
        break;
    }
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-touch-target bg-surface/95 backdrop-blur-sm border-b border-outline-variant dark:border-outline-variant">
        <div className="flex items-center gap-gutter">
          <LayoutGrid className="text-primary dark:text-primary active:scale-95 transition-transform duration-100 cursor-pointer" aria-hidden={true} focusable="false" />
          <h1 className="text-headline-md font-headline-md font-bold tracking-tighter text-primary dark:text-primary uppercase">TETRIS.IO</h1>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-gutter items-center h-full">
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 h-full flex items-center px-4 font-label-md text-label-md" href="#" onClick={(e) => handleNav(e, 'menu')}>Battle</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 h-full flex items-center px-4 font-label-md text-label-md" href="#" onClick={(e) => handleNav(e, 'ranks')}>Ranks</a>
          <a className="text-primary border-b-2 border-primary pb-1 hover:bg-surface-container-highest transition-colors duration-200 h-full flex items-center px-4 font-label-md text-label-md" href="#" onClick={(e) => handleNav(e, 'controls')}>Controls</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 h-full flex items-center px-4 font-label-md text-label-md" href="#" onClick={(e) => handleNav(e, 'options')}>Account</a>
        </nav>
        <div className="flex items-center gap-4">
          <HelpCircle className="text-primary dark:text-primary active:scale-95 transition-transform duration-100 hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer" aria-hidden={true} focusable="false" />
          <Settings className="text-primary dark:text-primary active:scale-95 transition-transform duration-100 hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer" aria-hidden={true} focusable="false" />
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow pt-touch-target md:pt-16 px-container-padding max-w-[1200px] mx-auto w-full">
        <div className="py-8">
          <h2 className="text-headline-lg font-headline-lg text-primary mb-8">Game Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Keyboard Mapping */}
            <section className="bg-[#111827] machined-border rounded p-6">
              <h3 className="text-headline-md font-headline-md text-primary mb-6 border-b border-outline-variant pb-2 flex items-center gap-2">
                <Keyboard aria-hidden={true} focusable="false" /> Keyboard
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center bg-surface-container-low p-3 rounded machined-border">
                  <span className="font-label-md text-label-md text-on-surface-variant">Move Left/Right</span>
                  <div className="flex gap-1">
                    <kbd className="bg-surface border border-outline-variant rounded px-2 py-1 font-label-sm text-label-sm text-primary shadow-sm">←</kbd>
                    <kbd className="bg-surface border border-outline-variant rounded px-2 py-1 font-label-sm text-label-sm text-primary shadow-sm">→</kbd>
                  </div>
                </li>
                <li className="flex justify-between items-center bg-surface-container-low p-3 rounded machined-border">
                  <span className="font-label-md text-label-md text-on-surface-variant">Soft Drop</span>
                  <kbd className="bg-surface border border-outline-variant rounded px-2 py-1 font-label-sm text-label-sm text-primary shadow-sm">↓</kbd>
                </li>
                <li className="flex justify-between items-center bg-surface-container-low p-3 rounded machined-border">
                  <span className="font-label-md text-label-md text-on-surface-variant">Hard Drop</span>
                  <kbd className="bg-surface border border-outline-variant rounded px-6 py-1 font-label-sm text-label-sm text-primary shadow-sm">Space</kbd>
                </li>
                <li className="flex justify-between items-center bg-surface-container-low p-3 rounded machined-border">
                  <span className="font-label-md text-label-md text-on-surface-variant">Rotate Left/Right</span>
                  <div className="flex gap-1">
                    <kbd className="bg-surface border border-outline-variant rounded px-2 py-1 font-label-sm text-label-sm text-primary shadow-sm">Z</kbd>
                    <kbd className="bg-surface border border-outline-variant rounded px-2 py-1 font-label-sm text-label-sm text-primary shadow-sm">↑</kbd>
                  </div>
                </li>
                <li className="flex justify-between items-center bg-surface-container-low p-3 rounded machined-border">
                  <span className="font-label-md text-label-md text-on-surface-variant">Hold Piece</span>
                  <kbd className="bg-surface border border-outline-variant rounded px-2 py-1 font-label-sm text-label-sm text-primary shadow-sm">C</kbd>
                </li>
                <li className="flex justify-between items-center bg-surface-container-low p-3 rounded machined-border">
                  <span className="font-label-md text-label-md text-on-surface-variant">Pause Game</span>
                  <kbd className="bg-surface border border-outline-variant rounded px-2 py-1 font-label-sm text-label-sm text-primary shadow-sm">P</kbd>
                </li>
              </ul>
            </section>
            {/* Touch Controls */}
            <section className="bg-[#111827] machined-border rounded p-6">
              <h3 className="text-headline-md font-headline-md text-primary mb-6 border-b border-outline-variant pb-2 flex items-center gap-2">
                <MousePointer aria-hidden={true} focusable="false" /> Touch
              </h3>
              <div className="relative w-full aspect-[4/3] bg-surface-container-lowest rounded machined-border flex items-center justify-center mb-6 overflow-hidden">
                {/* Simulated Screen */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#334155 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                {/* D-Pad Left */}
                <div className="absolute bottom-4 left-4 grid grid-cols-3 grid-rows-3 gap-1 opacity-70">
                  <div className="col-start-2 w-10 h-10 bg-surface-container-highest border border-outline-variant rounded-sm flex items-center justify-center text-primary"><RotateCw aria-hidden={true} focusable="false" /></div>
                  <div className="row-start-2 w-10 h-10 bg-surface-container-highest border border-outline-variant rounded-sm flex items-center justify-center text-primary"><ArrowLeft aria-hidden={true} focusable="false" /></div>
                  <div className="row-start-2 col-start-2 w-10 h-10 bg-surface border border-outline-variant rounded-sm"></div>
                  <div className="row-start-2 col-start-3 w-10 h-10 bg-surface-container-highest border border-outline-variant rounded-sm flex items-center justify-center text-primary"><ArrowRight aria-hidden={true} focusable="false" /></div>
                  <div className="row-start-3 col-start-2 w-10 h-10 bg-surface-container-highest border border-outline-variant rounded-sm flex items-center justify-center text-primary"><ArrowDown aria-hidden={true} focusable="false" /></div>
                </div>
                {/* Action Buttons Right */}
                <div className="absolute bottom-6 right-6 flex gap-4 opacity-70">
                  <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_10px_rgba(248,250,252,0.3)]">
                    <ChevronsDown aria-hidden={true} focusable="false" />
                  </div>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <MoveLeft className="text-primary" aria-hidden={true} focusable="false" />
                  <span className="font-label-md text-label-md text-on-surface-variant">Swipe Left/Right to move.</span>
                </li>
                <li className="flex items-center gap-4">
                  <MoveDown className="text-primary" aria-hidden={true} focusable="false" />
                  <span className="font-label-md text-label-md text-on-surface-variant">Swipe Down to soft drop.</span>
                </li>
                <li className="flex items-center gap-4">
                  <MousePointer className="text-primary" aria-hidden={true} focusable="false" />
                  <span className="font-label-md text-label-md text-on-surface-variant">Tap screen to rotate.</span>
                </li>
              </ul>
            </section>
            {/* Simple Rules */}
            <section className="bg-[#111827] machined-border rounded p-6 md:col-span-2">
              <h3 className="text-headline-md font-headline-md text-primary mb-4 border-b border-outline-variant pb-2">Rules Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-label-md text-label-md text-primary mb-2">1. Clear Lines</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Fill horizontal lines with blocks to clear them from the board and earn points.</p>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary mb-2">2. Survive</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Don't let the blocks stack up to the top of the screen, or the game ends.</p>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary mb-2">3. Score High</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Clear multiple lines at once (Tetris) or chain back-to-back clears for massive point multipliers.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[56px] bg-surface dark:bg-surface border-t border-outline-variant dark:border-outline-variant">
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'menu')}>
          <Gamepad2 aria-hidden={true} focusable="false" />
          <span className="font-label-sm text-label-sm mt-1">Battle</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'ranks')}>
          <Trophy aria-hidden={true} focusable="false" />
          <span className="font-label-sm text-label-sm mt-1">Ranks</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-primary bg-primary rounded-none w-full h-full border-t-2 border-primary active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'controls')}>
          <Keyboard aria-hidden={true} focusable="false" />
          <span className="font-label-sm text-label-sm mt-1">Controls</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'options')}>
          <User aria-hidden={true} focusable="false" />
          <span className="font-label-sm text-label-sm mt-1">Account</span>
        </a>
      </nav>
    </>
  );
}
