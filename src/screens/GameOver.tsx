// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Over
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { RotateCcw, Menu, Trophy } from "lucide-react";
import { useAppContext } from '../contexts/AppContext';

export type GameOverActionId = "play-again-1" | "return-to-menu-2";

export interface GameOverProps {
  actions?: Partial<Record<GameOverActionId, () => void>>;
}

export function GameOver({ actions }: GameOverProps) {
  const { state } = useAppContext();
  const isNewBest = state.score > 0 && state.score > state.highScore;

  const scoreDisplay = state.score.toLocaleString('en-US');
  const levelDisplay = state.level.toLocaleString('en-US');
  const linesDisplay = state.lines.toLocaleString('en-US');

  return (
    <>
      {/* Top Navigation Omitted - Contextual Suppression (Linear/Transactional "Game Over" Screen) */}
      <main className="flex-grow flex items-center justify-center p-gutter relative z-10">
        {/* Modal Overlay Background */}
        <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm -z-10"></div>
        <div className="w-full max-w-md">
          {/* Game Over Header */}
          <div className="text-center mb-8">
            <h1 className="text-display-lg font-display-lg text-error uppercase tracking-widest neon-glow-red mb-2">Game Over</h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant">Block out! No more space available.</p>
          </div>
          {/* Stats Card (Level 1 Panel) */}
          <div className="bg-[#111827] border border-[#334155] p-6 mb-8 shadow-2xl relative overflow-hidden group">
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-surface-variant"></div>
            <div className="flex flex-col gap-6">
              {/* Final Score (Hero Stat) */}
              <div className="text-center">
                <h2 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest mb-2">Final Score</h2>
                <div className="text-display-lg font-display-lg text-primary">
                  {scoreDisplay}
                </div>
              </div>
              <hr className="border-[#334155]" />
              {/* Secondary Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low border border-surface-variant p-4 text-center">
                  <h3 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Level Reached</h3>
                  <div className="text-headline-lg font-headline-lg text-primary">{levelDisplay}</div>
                </div>
                <div className="bg-surface-container-low border border-surface-variant p-4 text-center">
                  <h3 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Lines Cleared</h3>
                  <div className="text-headline-lg font-headline-lg text-primary">{linesDisplay}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Primary Action */}
            <button className="h-touch-target w-full bg-primary text-[#0F172A] flex items-center justify-center gap-2 hover:bg-opacity-90 active:scale-[0.98] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group" type="button" data-action-id="play-again-1" onClick={actions?.["play-again-1"]}>
              <RotateCcw data-icon="replay" data-weight="fill" aria-hidden={true} focusable="false" />
              <span className="text-label-md font-label-md uppercase tracking-widest font-bold">Play Again</span>
            </button>
            {/* Secondary Action */}
            <button className="h-touch-target w-full bg-[#111827] border border-[#334155] text-on-surface flex items-center justify-center gap-2 hover:bg-surface-container-high active:scale-[0.98] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="return-to-menu-2" onClick={actions?.["return-to-menu-2"]}>
              <Menu data-icon="menu" aria-hidden={true} focusable="false" />
              <span className="text-label-md font-label-md uppercase tracking-widest">Return to Menu</span>
            </button>
          </div>
          {/* Leaderboard Tease (Optional contextual element to encourage replay) */}
          <div className="mt-8 text-center text-label-sm font-label-sm text-on-surface-variant flex items-center justify-center gap-2">
            <Trophy data-icon="emoji_events" className="text-[16px]" aria-hidden={true} focusable="false" />
            {isNewBest ? 'New Personal Best! Top 5% globally.' : `High Score: ${state.highScore.toLocaleString('en-US')}`}
          </div>
        </div>
      </main>
      {/* Bottom Navigation Omitted - Contextual Suppression (Linear/Transactional "Game Over" Screen) */}
    </>
  );
}
