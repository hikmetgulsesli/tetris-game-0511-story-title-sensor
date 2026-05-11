// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Next Piece Preview
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Settings } from "lucide-react";


export type NextPiecePreviewActionId = "button-1-1" | "button-2-2";

export interface NextPiecePreviewProps {
  actions?: Partial<Record<NextPiecePreviewActionId, () => void>>;
}

export function NextPiecePreview({ actions }: NextPiecePreviewProps) {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-touch-target bg-surface/95 backdrop-blur-sm border-b border-outline-variant dark:border-outline-variant">
      <div className="flex items-center gap-2">
      <Circle className="text-primary text-headline-md" aria-hidden={true} focusable="false" />
      <h1 className="text-headline-md font-headline-md font-bold tracking-tighter text-primary dark:text-primary uppercase">TETRIS.IO</h1>
      </div>
      <div className="flex items-center gap-unit">
      <button className="w-touch-target h-touch-target flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 rounded" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <Circle aria-hidden={true} focusable="false" />
      </button>
      <button className="w-touch-target h-touch-target flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 rounded" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col md:flex-row items-center md:items-start justify-center pt-24 pb-12 px-gutter gap-gutter w-full max-w-5xl mx-auto">
      {/* Next Sequence Preview Panel */}
      <section className="bg-surface border-t-[4px] border-t-primary border-x border-b border-outline-variant w-full max-w-sm flex flex-col relative shadow-2xl">
      {/* Header */}
      <div className="p-gutter border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
      <h2 className="text-label-md font-label-md text-on-surface tracking-widest uppercase">Sequence Queue</h2>
      <span className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">LIVE</span>
      </div>
      {/* Queue Items Container */}
      <div className="p-container-padding flex flex-col gap-8 relative z-10">
      {/* Incoming Piece (T-Piece / Primary) */}
      <article className="flex flex-col gap-unit w-full group relative focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background" tabIndex={0}>
      <div className="flex justify-between w-full mb-1">
      <span className="text-label-sm font-label-sm text-primary animate-pulse">INCOMING</span>
      <span className="text-label-sm font-label-sm text-on-surface-variant group-hover:text-primary transition-colors">T-TYPE</span>
      </div>
      <div className="p-6 bg-surface-container-lowest border border-outline-variant w-full flex justify-center items-center rounded-sm transition-colors group-hover:bg-surface-container">
      {/* T Piece Structure */}
      <div className="grid grid-cols-3 gap-px bg-outline-variant/30 p-px">
      {/* Minos */}
      <div className="w-grid-block h-grid-block col-start-2 bg-primary flex items-center justify-center relative after:absolute after:inset-px after:border after:border-background/20 shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]"></div>
      <div className="w-grid-block h-grid-block row-start-2 col-start-1 bg-primary flex items-center justify-center relative after:absolute after:inset-px after:border after:border-background/20 shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]"></div>
      <div className="w-grid-block h-grid-block row-start-2 col-start-2 bg-primary flex items-center justify-center relative after:absolute after:inset-px after:border after:border-background/20 shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]"></div>
      <div className="w-grid-block h-grid-block row-start-2 col-start-3 bg-primary flex items-center justify-center relative after:absolute after:inset-px after:border after:border-background/20 shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]"></div>
      </div>
      </div>
      </article>
      {/* +1 Sequence (Z-Piece / Error Container) */}
      <article className="flex flex-col gap-unit w-full opacity-90 group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background" tabIndex={0}>
      <div className="flex justify-between w-full mb-1">
      <span className="text-label-sm font-label-sm text-on-surface-variant">+1 SEQUENCE</span>
      <span className="text-label-sm font-label-sm text-on-surface-variant group-hover:text-error-container transition-colors">Z-TYPE</span>
      </div>
      <div className="p-4 bg-surface-container-lowest/80 border border-outline-variant/80 w-full flex justify-center items-center rounded-sm transition-colors group-hover:bg-surface-container-lowest">
      <div className="grid grid-cols-3 gap-px bg-outline-variant/20 p-px">
      <div className="w-grid-block h-grid-block bg-error-container relative after:absolute after:inset-px after:border after:border-error/30 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"></div>
      <div className="w-grid-block h-grid-block bg-error-container relative after:absolute after:inset-px after:border after:border-error/30 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"></div>
      <div className="w-grid-block h-grid-block row-start-2 col-start-2 bg-error-container relative after:absolute after:inset-px after:border after:border-error/30 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"></div>
      <div className="w-grid-block h-grid-block row-start-2 col-start-3 bg-error-container relative after:absolute after:inset-px after:border after:border-error/30 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"></div>
      </div>
      </div>
      </article>
      {/* +2 Sequence (I-Piece / Secondary) */}
      <article className="flex flex-col gap-unit w-full opacity-70 group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background" tabIndex={0}>
      <div className="flex justify-between w-full mb-1">
      <span className="text-label-sm font-label-sm text-on-surface-variant">+2 SEQUENCE</span>
      <span className="text-label-sm font-label-sm text-on-surface-variant group-hover:text-secondary transition-colors">I-TYPE</span>
      </div>
      <div className="p-4 bg-surface-container-lowest/60 border border-outline-variant/60 w-full flex justify-center items-center rounded-sm transition-colors group-hover:bg-surface-container-lowest">
      <div className="grid grid-cols-4 gap-px bg-outline-variant/20 p-px">
      <div className="w-grid-block h-grid-block bg-secondary relative after:absolute after:inset-px after:border after:border-white/20 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]"></div>
      <div className="w-grid-block h-grid-block bg-secondary relative after:absolute after:inset-px after:border after:border-white/20 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]"></div>
      <div className="w-grid-block h-grid-block bg-secondary relative after:absolute after:inset-px after:border after:border-white/20 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]"></div>
      <div className="w-grid-block h-grid-block bg-secondary relative after:absolute after:inset-px after:border after:border-white/20 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]"></div>
      </div>
      </div>
      </article>
      </div>
      </section>
      {/* Auxiliary Technical Readout (Bento style context) */}
      <section className="w-full max-w-sm md:w-64 flex flex-col gap-gutter">
      {/* System Stats Card */}
      <div className="bg-surface border border-outline-variant p-container-padding flex flex-col gap-unit relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-secondary transition-colors duration-300 group-hover:w-2"></div>
      <h3 className="text-label-md font-label-md text-secondary tracking-widest uppercase pl-3 mb-2 flex items-center gap-2">
      <Circle className="text-[16px]" aria-hidden={true} focusable="false" /> Engine Data
                       </h3>
      <div className="flex justify-between items-center pl-3 pt-2 border-t border-outline-variant/50">
      <span className="text-label-sm font-label-sm text-on-surface-variant">RNG Seed</span>
      <span className="text-label-sm font-label-sm text-primary">0x7F4A2B</span>
      </div>
      <div className="flex justify-between items-center pl-3">
      <span className="text-label-sm font-label-sm text-on-surface-variant">Queue Depth</span>
      <span className="text-label-sm font-label-sm text-primary">3 / 5</span>
      </div>
      <div className="flex justify-between items-center pl-3">
      <span className="text-label-sm font-label-sm text-on-surface-variant">Algorithm</span>
      <span className="text-label-sm font-label-sm text-primary">7-Bag</span>
      </div>
      </div>
      {/* Distribution Mini-Chart */}
      <div className="bg-surface-container border border-outline-variant p-container-padding flex flex-col gap-4">
      <h3 className="text-label-md font-label-md text-on-surface tracking-widest uppercase flex items-center gap-2">
      <Circle className="text-[16px]" aria-hidden={true} focusable="false" /> Bias Check
                      </h3>
      <div className="flex flex-col gap-3">
      {/* Distribution Bars */}
      <div className="flex items-center gap-2">
      <span className="text-label-sm font-label-sm w-4 text-on-surface-variant">T</span>
      <div className="h-1.5 bg-surface-container-highest flex-1 overflow-hidden rounded-full"><div className="h-full bg-primary w-1/4 rounded-full"></div></div>
      </div>
      <div className="flex items-center gap-2">
      <span className="text-label-sm font-label-sm w-4 text-on-surface-variant">Z</span>
      <div className="h-1.5 bg-surface-container-highest flex-1 overflow-hidden rounded-full"><div className="h-full bg-error-container w-1/3 rounded-full"></div></div>
      </div>
      <div className="flex items-center gap-2">
      <span className="text-label-sm font-label-sm w-4 text-on-surface-variant">I</span>
      <div className="h-1.5 bg-surface-container-highest flex-1 overflow-hidden rounded-full"><div className="h-full bg-secondary w-1/5 rounded-full"></div></div>
      </div>
      </div>
      </div>
      </section>
      </main>
    </>
  );
}
