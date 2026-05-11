// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Options
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { useState, useEffect } from 'react';
import {
  HelpCircle,
  Keyboard,
  LayoutGrid,
  Settings,
  TriangleAlert,
  User,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { useAppContext } from '../contexts/AppContext';

export type GameOptionsActionId = "button-1-1" | "button-2-2" | "button-3-3" | "save-configuration-4" | "revert-defaults-5" | "clear-local-data-6";

export interface GameOptionsProps {
  actions?: Partial<Record<GameOptionsActionId, () => void>>;
}

const DEFAULTS = {
  masterVolume: 80,
  sfxVolume: 100,
  muteAll: false,
  difficulty: 'normal' as 'easy' | 'normal' | 'hard',
  das: 133,
  arr: 10,
};

const STORAGE_KEY = 'tetris-settings';

export function GameOptions({ actions }: GameOptionsProps) {
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

  const [masterVolume, setMasterVolume] = useState(DEFAULTS.masterVolume);
  const [sfxVolume, setSfxVolume] = useState(DEFAULTS.sfxVolume);
  const [muteAll, setMuteAll] = useState(DEFAULTS.muteAll);
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>(DEFAULTS.difficulty);
  const [das, setDas] = useState(DEFAULTS.das);
  const [arr, setArr] = useState(DEFAULTS.arr);
  const [errors, setErrors] = useState<{ das?: string; arr?: string }>({});

  const validate = (values: { das: number; arr: number }) => {
    const newErrors: { das?: string; arr?: string } = {};
    if (values.das < 50 || values.das > 300) {
      newErrors.das = 'DAS must be between 50ms and 300ms.';
    }
    if (values.arr < 0 || values.arr > 50) {
      newErrors.arr = 'ARR must be between 0ms and 50ms.';
    }
    return newErrors;
  };

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed.masterVolume === 'number') setMasterVolume(parsed.masterVolume);
      if (typeof parsed.sfxVolume === 'number') setSfxVolume(parsed.sfxVolume);
      if (typeof parsed.muteAll === 'boolean') setMuteAll(parsed.muteAll);
      if (parsed.difficulty === 'easy' || parsed.difficulty === 'normal' || parsed.difficulty === 'hard') {
        setDifficulty(parsed.difficulty);
      }
      if (typeof parsed.das === 'number') setDas(parsed.das);
      if (typeof parsed.arr === 'number') setArr(parsed.arr);
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const handleSave = () => {
    const newErrors = validate({ das, arr });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        masterVolume,
        sfxVolume,
        muteAll,
        difficulty,
        das,
        arr,
      }));
      actions?.["save-configuration-4"]?.();
    }
  };

  const handleRevert = () => {
    setMasterVolume(DEFAULTS.masterVolume);
    setSfxVolume(DEFAULTS.sfxVolume);
    setMuteAll(DEFAULTS.muteAll);
    setDifficulty(DEFAULTS.difficulty);
    setDas(DEFAULTS.das);
    setArr(DEFAULTS.arr);
    setErrors({});
    actions?.["revert-defaults-5"]?.();
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-touch-target bg-surface/95 backdrop-blur-sm text-primary dark:text-primary border-b border-outline-variant dark:border-outline-variant">
        <div className="flex items-center gap-4">
          <button aria-label="Menu" className="flex items-center justify-center w-touch-target h-touch-target hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 transition-transform duration-100" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
            <LayoutGrid aria-hidden={true} focusable="false" />
          </button>
          <h1 className="text-headline-md font-headline-md font-bold tracking-tighter text-primary dark:text-primary uppercase">TETRIS.IO</h1>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex h-full">
          <a className="flex items-center px-4 text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200" href="#" onClick={(e) => handleNav(e, 'menu')}>Battle</a>
          <a className="flex items-center px-4 text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200" href="#" onClick={(e) => handleNav(e, 'ranks')}>Ranks</a>
          <a className="flex items-center px-4 text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200" href="#" onClick={(e) => handleNav(e, 'controls')}>Controls</a>
          <a className="flex items-center px-4 text-primary border-b-2 border-primary pb-1 hover:text-primary hover:bg-surface-container-highest transition-colors duration-200" href="#" onClick={(e) => handleNav(e, 'options')}>Account</a>
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Help" className="flex items-center justify-center w-touch-target h-touch-target hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 transition-transform duration-100" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
            <HelpCircle aria-hidden={true} focusable="false" />
          </button>
          <button aria-label="Settings" className="flex items-center justify-center w-touch-target h-touch-target hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 transition-transform duration-100" type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]}>
            <Settings aria-hidden={true} focusable="false" />
          </button>
        </div>
      </header>
      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-8 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        {/* Page Header */}
        <div className="col-span-1 md:col-span-12 mb-4">
          <h2 className="text-display-lg font-display-lg text-primary uppercase">Game Settings</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">Configure your terminal experience.</p>
        </div>
        {/* Settings Content - Bento Layout */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-6">
          {/* Audio Settings */}
          <section className="bg-surface-container-low machined-border p-6 rounded-none flex flex-col gap-6 focus-ring">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
              <Volume2 className="text-primary text-[24px]" aria-hidden={true} focusable="false" />
              <h3 className="text-headline-md font-headline-md text-primary">Audio</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center group">
                <label className="text-label-md font-label-md text-on-background group-hover:text-primary transition-colors" htmlFor="master-volume">Master Volume</label>
                <div className="w-1/2 flex items-center gap-3">
                  <VolumeX className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
                  <input
                    className="w-full h-1 bg-surface-variant rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    id="master-volume"
                    max={100}
                    min={0}
                    type="range"
                    value={masterVolume}
                    onChange={(e) => setMasterVolume(Number(e.target.value))}
                  />
                  <Volume2 className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
                </div>
              </div>
              <div className="flex justify-between items-center group">
                <label className="text-label-md font-label-md text-on-background group-hover:text-primary transition-colors" htmlFor="sfx-volume">Sound Effects</label>
                <div className="w-1/2 flex items-center gap-3">
                  <VolumeX className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
                  <input
                    className="w-full h-1 bg-surface-variant rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    id="sfx-volume"
                    max={100}
                    min={0}
                    type="range"
                    value={sfxVolume}
                    onChange={(e) => setSfxVolume(Number(e.target.value))}
                  />
                  <Volume2 className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 group">
                <span className="text-label-md font-label-md text-on-background group-hover:text-primary transition-colors">Mute All</span>
                <label className="relative inline-flex items-center cursor-pointer min-h-[44px]">
                  <input
                    className="sr-only peer"
                    type="checkbox"
                    checked={muteAll}
                    onChange={(e) => setMuteAll(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-background rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-none after:h-5 after:w-5 after:transition-transform peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>
          {/* Difficulty Settings */}
          <section className="bg-surface-container-low machined-border p-6 rounded-none flex flex-col gap-6 focus-ring">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
              <Zap className="text-primary text-[24px]" aria-hidden={true} focusable="false" />
              <h3 className="text-headline-md font-headline-md text-primary">Starting Difficulty</h3>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant">Select your initial drop speed. This affects base scoring multiplier.</p>
            <div className="grid grid-cols-3 gap-4">
              <label className="relative cursor-pointer min-h-[44px] block focus-ring">
                <input
                  className="peer sr-only"
                  name="difficulty"
                  type="radio"
                  value="easy"
                  checked={difficulty === 'easy'}
                  onChange={() => setDifficulty('easy')}
                />
                <div className="h-full flex flex-col items-center justify-center p-4 bg-surface machined-border peer-checked:bg-surface-variant peer-checked:border-primary peer-checked:text-primary text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span className="text-label-md font-label-md uppercase tracking-wider mb-2">Easy</span>
                  <span className="text-label-sm font-label-sm text-center opacity-70">0.5x Multiplier</span>
                </div>
              </label>
              <label className="relative cursor-pointer min-h-[44px] block focus-ring">
                <input
                  className="peer sr-only"
                  name="difficulty"
                  type="radio"
                  value="normal"
                  checked={difficulty === 'normal'}
                  onChange={() => setDifficulty('normal')}
                />
                <div className="h-full flex flex-col items-center justify-center p-4 bg-surface machined-border peer-checked:bg-surface-variant peer-checked:border-primary peer-checked:text-primary text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span className="text-label-md font-label-md uppercase tracking-wider mb-2">Normal</span>
                  <span className="text-label-sm font-label-sm text-center opacity-70">1.0x Multiplier</span>
                </div>
              </label>
              <label className="relative cursor-pointer min-h-[44px] block focus-ring">
                <input
                  className="peer sr-only"
                  name="difficulty"
                  type="radio"
                  value="hard"
                  checked={difficulty === 'hard'}
                  onChange={() => setDifficulty('hard')}
                />
                <div className="h-full flex flex-col items-center justify-center p-4 bg-surface machined-border peer-checked:bg-surface-variant peer-checked:border-primary peer-checked:text-primary text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span className="text-label-md font-label-md uppercase tracking-wider mb-2 text-error">Hard</span>
                  <span className="text-label-sm font-label-sm text-center opacity-70">2.0x Multiplier</span>
                </div>
              </label>
            </div>
          </section>
          {/* Controls Sensitivity */}
          <section className="bg-surface-container-low machined-border p-6 rounded-none flex flex-col gap-6 focus-ring">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
              <Keyboard className="text-primary text-[24px]" aria-hidden={true} focusable="false" />
              <h3 className="text-headline-md font-headline-md text-primary">Input Sensitivity</h3>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <label className="text-label-md font-label-md text-on-background group-hover:text-primary transition-colors" htmlFor="das">DAS (Delayed Auto Shift)</label>
                  <span className="text-label-sm font-label-sm text-primary bg-surface-variant px-2 py-1">{das}ms</span>
                </div>
                <input
                  className="w-full h-1 bg-surface-variant rounded-none appearance-none cursor-pointer mt-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  id="das"
                  max={300}
                  min={50}
                  type="range"
                  value={das}
                  onChange={(e) => setDas(Number(e.target.value))}
                />
                <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mt-1">
                  <span>Fast</span>
                  <span>Slow</span>
                </div>
                {errors.das && <p className="text-label-sm font-label-sm text-error mt-1">{errors.das}</p>}
              </div>
              <div className="flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <label className="text-label-md font-label-md text-on-background group-hover:text-primary transition-colors" htmlFor="arr">ARR (Auto Repeat Rate)</label>
                  <span className="text-label-sm font-label-sm text-primary bg-surface-variant px-2 py-1">{arr}ms</span>
                </div>
                <input
                  className="w-full h-1 bg-surface-variant rounded-none appearance-none cursor-pointer mt-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  id="arr"
                  max={50}
                  min={0}
                  type="range"
                  value={arr}
                  onChange={(e) => setArr(Number(e.target.value))}
                />
                <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mt-1">
                  <span>Instant</span>
                  <span>Laggy</span>
                </div>
                {errors.arr && <p className="text-label-sm font-label-sm text-error mt-1">{errors.arr}</p>}
              </div>
            </div>
          </section>
        </div>
        {/* Sidebar Actions */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          {/* Save Area */}
          <div className="bg-surface-container-low machined-border p-6 rounded-none flex flex-col gap-4 sticky top-[80px]">
            <h4 className="text-headline-md font-headline-md text-primary border-b border-outline-variant pb-2">Actions</h4>
            <p className="text-body-md font-body-md text-on-surface-variant mb-2">Changes are applied immediately, but must be saved to persist across sessions.</p>
            <button className="min-h-[44px] bg-primary text-on-primary text-label-md font-label-md uppercase tracking-widest hover:bg-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background active:scale-[0.98]" type="button" data-action-id="save-configuration-4" onClick={handleSave}>
              Save Configuration
            </button>
            <button className="min-h-[44px] bg-surface text-on-background border border-outline-variant hover:bg-surface-variant hover:text-primary transition-colors text-label-md font-label-md uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background active:scale-[0.98]" type="button" data-action-id="revert-defaults-5" onClick={handleRevert}>
              Revert Defaults
            </button>
            <hr className="border-outline-variant my-2" />
            {/* Danger Zone */}
            <div className="mt-2">
              <h5 className="text-label-md font-label-md text-error mb-2 uppercase tracking-widest flex items-center gap-2">
                <TriangleAlert className="text-[16px]" aria-hidden={true} focusable="false" /> Danger Zone
              </h5>
              <div className="border border-error-container bg-[#1a0505] p-4 flex flex-col gap-3">
                <p className="text-label-sm font-label-sm text-on-surface-variant">Permanently delete all local high scores and replays.</p>
                <button className="min-h-[44px] bg-transparent border border-error text-error hover:bg-error-container hover:text-on-error-container transition-colors text-label-md font-label-md uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="clear-local-data-6" onClick={actions?.["clear-local-data-6"]}>
                  Clear Local Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[56px] bg-surface dark:bg-surface border-t border-outline-variant dark:border-outline-variant">
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'menu')}>
          <LayoutGrid aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Battle</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'ranks')}>
          <User aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Ranks</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'controls')}>
          <Keyboard aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Controls</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-primary bg-primary rounded-none w-full h-full border-t-2 border-primary hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100" href="#" onClick={(e) => handleNav(e, 'options')}>
          <User aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm mt-1">Account</span>
        </a>
      </nav>
    </>
  );
}
