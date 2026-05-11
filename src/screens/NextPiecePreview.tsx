// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Next Piece Preview
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Settings } from "lucide-react";
import { useAppContext } from '../contexts/AppContext';
import { TETROMINOES, type TetrominoType } from '../types/domain';

export type NextPiecePreviewActionId = "button-1-1" | "button-2-2";

export interface NextPiecePreviewProps {
  actions?: Partial<Record<NextPiecePreviewActionId, () => void>>;
}

const SEQUENCE_LABELS = ["INCOMING", "+1 SEQUENCE", "+2 SEQUENCE"];

function MiniPieceGrid({ type }: { type: TetrominoType }) {
  const shape = TETROMINOES[type][0];
  const minX = Math.min(...shape.map(([x]) => x));
  const minY = Math.min(...shape.map(([, y]) => y));
  const normalized = shape.map(([x, y]) => ({ x: x - minX, y: y - minY }));
  const maxX = Math.max(...normalized.map(p => p.x));
  const cols = maxX + 1;

  const gridClass = cols === 4 ? 'grid-cols-4' : cols === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-px bg-outline-variant/30 p-px`}>
      {normalized.map((pos, i) => (
        <div
          key={i}
          className={`w-grid-block h-grid-block tetromino-${type.toLowerCase()} flex items-center justify-center relative after:absolute after:inset-px after:border after:border-background/20 shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]`}
          style={{ gridColumnStart: pos.x + 1, gridRowStart: pos.y + 1 }}
        />
      ))}
    </div>
  );
}

export function NextPiecePreview({ actions }: NextPiecePreviewProps) {
  const { state } = useAppContext();
  const nextPreview = state.nextPieces.slice(0, 3);

  // Decorative bias values derived from piece type for consistent visuals
  const biasMap: Record<TetrominoType, { label: string; width: string; colorClass: string }> = {
    I: { label: 'I', width: 'w-1/5', colorClass: 'bg-secondary' },
    O: { label: 'O', width: 'w-1/6', colorClass: 'bg-tertiary' },
    T: { label: 'T', width: 'w-1/4', colorClass: 'bg-primary' },
    S: { label: 'S', width: 'w-1/5', colorClass: 'bg-success' },
    Z: { label: 'Z', width: 'w-1/3', colorClass: 'bg-error-container' },
    J: { label: 'J', width: 'w-1/4', colorClass: 'bg-info' },
    L: { label: 'L', width: 'w-1/4', colorClass: 'bg-warning' },
  };

  const firstThreeTypes = nextPreview.slice(0, 3);
  const biasBars = firstThreeTypes.length >= 3
    ? [firstThreeTypes[0], firstThreeTypes[1], firstThreeTypes[2]].map(t => biasMap[t])
    : [
        { label: 'T', width: 'w-1/4', colorClass: 'bg-primary' },
        { label: 'Z', width: 'w-1/3', colorClass: 'bg-error-container' },
        { label: 'I', width: 'w-1/5', colorClass: 'bg-secondary' },
      ];

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-touch-target bg-surface/95 backdrop-blur-sm border-b border-outline-variant dark:border-outline-variant">
        <div className="flex items-center gap-2">
          <Circle className="text-primary text-headline-md" aria-hidden={true} focusable="false" />
          <h1 className="text-headline-md font-headline-md font-bold tracking-tighter text-primary dark:text-primary uppercase">TETRIS.IO</h1>
        </div>
        <div className="flex items-center gap-unit">
          <button className="w-touch-target h-touch-target flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 rounded" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]} aria-label="Help">
            <Circle aria-hidden={true} focusable="false" />
          </button>
          <button className="w-touch-target h-touch-target flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 active:scale-95 rounded" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]} aria-label="Settings">
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
            {nextPreview.length === 0 && (
              <div className="flex flex-col gap-unit w-full">
                <div className="flex justify-between w-full mb-1">
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Queue Empty</span>
                </div>
                <div className="p-6 bg-surface-container-lowest border border-outline-variant w-full flex justify-center items-center rounded-sm">
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Waiting for pieces...</span>
                </div>
              </div>
            )}
            {nextPreview.map((type, idx) => {
              const isIncoming = idx === 0;
              const opacityClass = isIncoming ? '' : idx === 1 ? 'opacity-90' : 'opacity-70';
              const paddingClass = isIncoming ? 'p-6' : 'p-4';
              const bgClass = isIncoming ? 'bg-surface-container-lowest' : idx === 1 ? 'bg-surface-container-lowest/80' : 'bg-surface-container-lowest/60';
              const borderClass = isIncoming ? 'border-outline-variant' : 'border-outline-variant/80';
              const labelColor = isIncoming ? 'text-primary animate-pulse' : 'text-on-surface-variant';
              const typeColor = isIncoming ? 'text-on-surface-variant group-hover:text-primary' : idx === 1 ? 'text-on-surface-variant group-hover:text-error-container' : 'text-on-surface-variant group-hover:text-secondary';
              const shadowClass = isIncoming ? 'shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]' : 'shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]';
              const afterBorder = isIncoming ? 'after:border-background/20' : idx === 1 ? 'after:border-error/30' : 'after:border-white/20';

              return (
                <article key={`next-${type}-${idx}`} className={`flex flex-col gap-unit w-full group relative focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background ${opacityClass}`} tabIndex={0}>
                  <div className="flex justify-between w-full mb-1">
                    <span className={`text-label-sm font-label-sm ${labelColor} transition-colors`}>{SEQUENCE_LABELS[idx] ?? `+${idx} SEQUENCE`}</span>
                    <span className={`text-label-sm font-label-sm ${typeColor} transition-colors`}>{type}-TYPE</span>
                  </div>
                  <div className={`${paddingClass} ${bgClass} border ${borderClass} w-full flex justify-center items-center rounded-sm transition-colors group-hover:bg-surface-container`}>
                    <div className={`grid gap-px bg-outline-variant/30 p-px`}>
                      <MiniPieceGrid type={type} />
                    </div>
                  </div>
                </article>
              );
            })}
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
              <span className="text-label-sm font-label-sm text-primary">{state.nextPieces.length} / 5</span>
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
              {biasBars.map((bar, i) => (
                <div key={`bias-${bar.label}-${i}`} className="flex items-center gap-2">
                  <span className="text-label-sm font-label-sm w-4 text-on-surface-variant">{bar.label}</span>
                  <div className="h-1.5 bg-surface-container-highest flex-1 overflow-hidden rounded-full">
                    <div className={`h-full ${bar.colorClass} ${bar.width} rounded-full`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
