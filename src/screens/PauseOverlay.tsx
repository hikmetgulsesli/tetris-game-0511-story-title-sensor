// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Pause Overlay
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Play, Pause, RefreshCw, LogOut, Keyboard } from "lucide-react";
import { useAppContext } from '../contexts/AppContext';

export type PauseOverlayActionId = "resume-game-1" | "restart-2" | "main-menu-3";

export interface PauseOverlayProps {
  actions?: Partial<Record<PauseOverlayActionId, () => void>>;
}

export function PauseOverlay({ actions }: PauseOverlayProps) {
  const { state } = useAppContext();
  const scoreDisplay = state.score.toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: true });

  return (
    <>
      {/* Simulated Background Game State (Behind the Modal)
              Using a placeholder image and a heavy backdrop tint as per guidelines:
              "Use a heavy backdrop tint (90% opacity of #0F172A) to completely isolate the user..." */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" data-alt="A high-contrast, cyberpunk-inspired view of a digital puzzle game board in a paused state. The scene features subtle, glowing, neon-tinged geometric shapes stacked faintly in the background. The aesthetic relies on a sophisticated palette of deep blacks, space blues, and pristine whites, characteristic of a premium, modern arcade interface. The lighting is moody and dramatic, ensuring a dark, technical atmosphere perfect for high-performance gaming." style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDIcZ0nf047n-5k-Fs0zAi72t749nYKsSg2Y05lb5LILzkr1DePufd3F8TZ7X_jl-RApWNiIV_VzMvXm5KkoJb82ZEK5K1E-0wBYqFsdkae1uCOg36NWxJQP2iPoTsw3wtgGw6rGgB61pdb3dxSAJ6Of669Lw92Ilv9Y2_Pgfqi_YWtb57_CqajHch1wpSdtiXvEoKjXTH6iGEqiCVYZkWJlsbTwV0AJmh8CsVq2jSxKHUMyf1wada0bR5OjvzOb4kAfj5JnlbEvCYy')"}}>
      </div>
      {/* Heavy Backdrop Tint Layer */}
      <div className="absolute inset-0 z-10 bg-background/90 backdrop-blur-md"></div>
      {/* Pause Overlay Canvas (Level 1 Panel)
              Suppressed TopAppBar/BottomNavBar due to Task-Focused/Transactional state. */}
      <main className="relative z-20 w-full max-w-[400px] px-container-padding flex flex-col items-center justify-center">
        {/* Modal Card: Sharp edges, Tonal Layer #111827 (surface-container) with outline border */}
        <section className="w-full bg-surface-container border border-outline-variant rounded-none p-8 flex flex-col items-center shadow-2xl shadow-black/50">
          {/* Pause Icon & Title Header */}
          <div className="flex flex-col items-center mb-8 gap-4">
            <Pause data-weight="fill" className="text-[64px] text-primary" aria-hidden={true} focusable="false" />
            <h1 className="font-display-lg text-display-lg text-primary uppercase tracking-tight text-center">
              Paused
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-[0.2em] text-center mt-2">
              Current Score: <span className="text-primary font-bold">{scoreDisplay}</span>
            </p>
          </div>
          {/* Divider */}
          <div className="w-full h-px bg-outline-variant mb-8 opacity-50"></div>
          {/* Action Buttons Container: 44px Touch Target Rule Applied */}
          <div className="w-full flex flex-col gap-4">
            {/* Primary Action: Resume */}
            {/* High-contrast primary color background with dark text, sharp edges */}
            <button className="group relative w-full h-[44px] flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider transition-colors duration-200 hover:bg-primary-container active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="resume-game-1" onClick={actions?.["resume-game-1"]}>
              <Play data-icon="play_arrow" data-weight="fill" className="text-on-primary group-hover:scale-110 transition-transform" aria-hidden={true} focusable="false" />
              <span>Resume Game</span>
              {/* Inner machined stroke effect for primary button */}
              <div className="absolute inset-[1px] border border-on-primary/10 pointer-events-none"></div>
            </button>
            {/* Secondary Action: Restart */}
            {/* Surface background, border outline, text hover effects */}
            <button className="group w-full h-[44px] flex items-center justify-center gap-2 bg-surface border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors duration-200 hover:bg-surface-variant hover:border-primary hover:text-primary active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="restart-2" onClick={actions?.["restart-2"]}>
              <RefreshCw data-icon="refresh" className="text-on-surface group-hover:text-primary transition-colors" aria-hidden={true} focusable="false" />
              <span>Restart</span>
            </button>
            {/* Secondary Action: Main Menu */}
            <button className="group w-full h-[44px] flex items-center justify-center gap-2 bg-surface border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors duration-200 hover:bg-surface-variant hover:border-primary hover:text-primary active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mt-4" type="button" data-action-id="main-menu-3" onClick={actions?.["main-menu-3"]}>
              <LogOut data-icon="exit_to_app" className="text-on-surface group-hover:text-primary transition-colors" aria-hidden={true} focusable="false" />
              <span>Main Menu</span>
            </button>
          </div>
        </section>
        {/* Optional subtle helper text outside the card */}
        <div className="mt-8 flex items-center gap-2 text-on-surface-variant/50">
          <Keyboard data-icon="keyboard" className="text-[16px]" aria-hidden={true} focusable="false" />
          <span className="font-label-sm text-label-sm uppercase tracking-widest">
            Press ESC to resume
          </span>
        </div>
      </main>
    </>
  );
}
