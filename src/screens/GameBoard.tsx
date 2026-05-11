// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Board
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Circle, RotateCw, Settings } from "lucide-react";
import { useAppContext } from '../contexts/AppContext';
import { getPieceCells, getGhostY, TETROMINOES, BOARD_WIDTH, BOARD_HEIGHT, type TetrominoType } from '../types/domain';

export type GameBoardActionId = "button-1-1" | "button-2-2" | "button-3-3" | "button-4-4" | "button-5-5" | "button-6-6" | "button-7-7" | "pause-esc-8";

export interface GameBoardProps {
  actions?: Partial<Record<GameBoardActionId, () => void>>;
}

function MiniPiecePreview({ type, scale = 1 }: { type: TetrominoType; scale?: number }) {
  const shape = TETROMINOES[type][0];
  const minX = Math.min(...shape.map(([x]) => x));
  const maxX = Math.max(...shape.map(([x]) => x));
  const minY = Math.min(...shape.map(([, y]) => y));
  const maxY = Math.max(...shape.map(([, y]) => y));
  const width = (maxX - minX + 1) * 32;
  const height = (maxY - minY + 1) * 32;

  return (
    <div
      className="relative"
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }}
    >
      {shape.map(([dx, dy], i) => (
        <div
          key={i}
          className={`tetromino-${type.toLowerCase()}`}
          style={{
            position: 'absolute',
            left: `${(dx - minX) * 32 * scale}px`,
            top: `${(dy - minY) * 32 * scale}px`,
            width: `${32 * scale}px`,
            height: `${32 * scale}px`,
          }}
        />
      ))}
    </div>
  );
}

export function GameBoard({ actions }: GameBoardProps) {
  const { state } = useAppContext();

  const { currentCells, ghostCells } = useMemo(() => {
    if (!state.currentPiece) return { currentCells: [], ghostCells: [] };
    const cells = getPieceCells(state.currentPiece);
    const ghostY = getGhostY(state.board, state.currentPiece);
    const ghostPiece = { ...state.currentPiece, y: ghostY };
    const gCells = getPieceCells(ghostPiece);
    return { currentCells: cells, ghostCells: gCells };
  }, [state.currentPiece, state.board]);

  const boardCells = useMemo(() => {
    const cells: { x: number; y: number; type: TetrominoType }[] = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const cell = state.board[y][x];
        if (cell) {
          cells.push({ x, y, type: cell });
        }
      }
    }
    return cells;
  }, [state.board]);

  const nextPreview = state.nextPieces.slice(0, 3);
  const hasHold = state.holdPiece !== null;

  const scoreDisplay = String(state.score).padStart(7, '0');
  const levelDisplay = String(state.level).padStart(2, '0');
  const linesDisplay = String(state.lines).padStart(3, '0');

  return (
    <>
      {/* TopAppBar (Hidden md to show on mobile, or adjusted for desktop) */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-touch-target bg-surface/95 backdrop-blur-sm border-b border-outline-variant dark:border-outline-variant flat no shadows md:hidden">
        <div className="flex items-center gap-3">
          <Circle className="text-primary dark:text-primary" aria-hidden={true} focusable="false" />
          <span className="text-headline-md font-headline-md font-bold tracking-tighter text-primary dark:text-primary uppercase">TETRIS.IO</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant dark:text-on-surface-variant">
          <button className="min-touch flex items-center justify-center hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-full active:scale-95 transition-transform duration-100" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]} aria-label="Help">
            <Circle style={{ fontVariationSettings: "'FILL' 0" }} aria-hidden={true} focusable="false" />
          </button>
          <button className="min-touch flex items-center justify-center hover:text-primary hover:bg-surface-container-highest transition-colors duration-200 rounded-full active:scale-95 transition-transform duration-100" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]} aria-label="Settings">
            <Settings style={{ fontVariationSettings: "'FILL' 0" }} aria-hidden={true} focusable="false" />
          </button>
        </div>
      </header>
      {/* Main Game Container */}
      <main className="flex-grow flex items-center justify-center p-gutter w-full max-w-[1200px] mx-auto">
        {/* Game Layout Wrapper (Responsive Bento-ish) */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_320px_auto] gap-gutter md:gap-[32px] w-full max-w-4xl mx-auto items-start justify-center">
          {/* Left Panel: Stats (Desktop) / Top (Mobile) */}
          <div className="flex flex-row md:flex-col gap-unit md:gap-gutter w-full order-2 md:order-1 justify-between md:justify-start">
            {/* Score Card */}
            <div className="bg-[#111827] border border-[#334155] border-t-2 border-t-primary rounded p-3 md:p-4 flex flex-col w-full">
              <h2 className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-1">Score</h2>
              <div className="text-headline-md font-headline-md text-primary tracking-wider font-bold">{scoreDisplay}</div>
            </div>
            {/* Level Card */}
            <div className="bg-[#111827] border border-[#334155] border-t-2 border-t-secondary rounded p-3 md:p-4 flex flex-col w-full">
              <h2 className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-1">Level</h2>
              <div className="text-headline-md font-headline-md text-secondary tracking-wider font-bold">{levelDisplay}</div>
            </div>
            {/* Lines Card */}
            <div className="bg-[#111827] border border-[#334155] border-t-2 border-t-tertiary-fixed rounded p-3 md:p-4 flex flex-col w-full">
              <h2 className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-1">Lines</h2>
              <div className="text-headline-md font-headline-md text-tertiary-fixed tracking-wider font-bold">{linesDisplay}</div>
            </div>
            {/* Hold Piece (Desktop mainly) */}
            <div className="hidden md:flex bg-[#111827] border border-[#334155] rounded p-4 flex-col mt-4">
              <h2 className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-4 text-center">Hold</h2>
              <div className="w-[128px] h-[128px] mx-auto flex items-center justify-center border border-[#334155]/50 bg-background/50 rounded">
                {hasHold && state.holdPiece ? (
                  <MiniPiecePreview type={state.holdPiece} scale={1.2} />
                ) : (
                  <span className="text-on-surface-variant opacity-30 font-label-md text-label-md">EMPTY</span>
                )}
              </div>
            </div>
          </div>
          {/* Center Panel: The Game Board */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background outline-none" tabIndex={0}>
            {/* Board Frame */}
            <div className="bg-[#111827] p-2 rounded-lg border-2 border-[#334155] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              {/* The Grid (10x20) */}
              <div role="application" aria-label="Tetris game board" className="w-[320px] h-[640px] bg-[#0F172A] tetris-grid-bg relative overflow-hidden border border-[#334155]/50">
                {/* Locked board cells */}
                {boardCells.map(({ x, y, type }, i) => (
                  <div
                    key={`b-${x}-${y}`}
                    className={`tetromino-${type.toLowerCase()}`}
                    style={{
                      position: 'absolute',
                      left: `${x * 32}px`,
                      top: `${y * 32}px`,
                      width: '32px',
                      height: '32px',
                    }}
                  />
                ))}
                {/* Ghost Piece */}
                {ghostCells.map(({ x, y }, i) => (
                  <div
                    key={`g-${x}-${y}`}
                    className="ghost-piece"
                    style={{
                      position: 'absolute',
                      left: `${x * 32}px`,
                      top: `${y * 32}px`,
                      width: '32px',
                      height: '32px',
                    }}
                  />
                ))}
                {/* Active Piece */}
                {currentCells.map(({ x, y }, i) => {
                  const type = state.currentPiece?.type;
                  if (!type) return null;
                  return (
                    <div
                      key={`a-${x}-${y}`}
                      className={`tetromino-${type.toLowerCase()}`}
                      style={{
                        position: 'absolute',
                        left: `${x * 32}px`,
                        top: `${y * 32}px`,
                        width: '32px',
                        height: '32px',
                      }}
                    />
                  );
                })}
              </div>
            </div>
            {/* Mobile On-Screen Controls (Visible only on small screens) */}
            <div className="w-full mt-6 grid grid-cols-5 gap-2 md:hidden">
              <button className="bg-[#111827] border border-[#334155] text-on-surface flex items-center justify-center rounded min-touch active:bg-surface-variant" type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]} aria-label="Left">
                <ArrowLeft aria-hidden={true} focusable="false" />
              </button>
              <button className="bg-[#111827] border border-[#334155] text-on-surface flex items-center justify-center rounded min-touch active:bg-surface-variant" type="button" data-action-id="button-4-4" onClick={actions?.["button-4-4"]} aria-label="Down">
                <Circle aria-hidden={true} focusable="false" />
              </button>
              <button className="bg-[#111827] border border-[#334155] text-on-surface flex items-center justify-center rounded min-touch active:bg-surface-variant" type="button" data-action-id="button-5-5" onClick={actions?.["button-5-5"]} aria-label="Right">
                <ArrowRight aria-hidden={true} focusable="false" />
              </button>
              <button className="bg-[#111827] border border-[#334155] text-on-surface flex items-center justify-center rounded min-touch active:bg-surface-variant" type="button" data-action-id="button-6-6" onClick={actions?.["button-6-6"]} aria-label="Rotate">
                <RotateCw aria-hidden={true} focusable="false" />
              </button>
              <button className="bg-primary text-on-primary border border-primary flex items-center justify-center rounded min-touch font-bold active:opacity-80" type="button" data-action-id="button-7-7" onClick={actions?.["button-7-7"]} aria-label="Hard Drop">
                <Circle aria-hidden={true} focusable="false" />
              </button>
            </div>
          </div>
          {/* Right Panel: Next Pieces & Actions */}
          <div className="flex flex-col gap-4 w-full order-3 hidden md:flex">
            {/* Next Queue */}
            <div className="bg-[#111827] border border-[#334155] rounded p-4 flex flex-col">
              <h2 className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-4 text-center">Next</h2>
              <div className="flex flex-col gap-4 items-center">
                {nextPreview.map((type, idx) => {
                  const containerSize = idx === 0 ? 96 : 64;
                  const scale = idx === 0 ? 0.75 : 0.5;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-center border border-[#334155]/30 bg-background/30 rounded relative"
                      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
                    >
                      <MiniPiecePreview type={type} scale={scale} />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Status / Action */}
            <div className="mt-auto flex flex-col gap-2">
              <div className="bg-surface-container-low border border-outline-variant px-4 py-2 rounded text-center">
                <span className="text-label-sm font-label-sm text-primary uppercase animate-pulse">Playing</span>
              </div>
              <button className="bg-[#111827] border border-[#334155] text-on-surface py-2 rounded min-touch hover:bg-surface-variant transition-colors text-label-md font-label-md uppercase tracking-wider" type="button" data-action-id="pause-esc-8" onClick={actions?.["pause-esc-8"]}>
                Pause (Esc)
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[56px] bg-surface dark:bg-surface border-t border-outline-variant dark:border-outline-variant flat no shadows md:hidden">
        <a className="flex flex-col items-center justify-center text-on-primary bg-primary rounded-none w-full h-full border-t-2 border-primary active:opacity-80 transition-opacity duration-100 group" href="#">
          <Circle style={{ fontVariationSettings: "'FILL' 1" }} className="text-[24px] mb-1 group-hover:bg-surface-container-high transition-colors duration-200" aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm">Battle</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100 group" href="#">
          <Circle style={{ fontVariationSettings: "'FILL' 0" }} className="text-[24px] mb-1" aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm">Ranks</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100 group" href="#">
          <Circle style={{ fontVariationSettings: "'FILL' 0" }} className="text-[24px] mb-1" aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm">Controls</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant w-full h-full hover:bg-surface-container-high transition-colors duration-200 active:opacity-80 transition-opacity duration-100 group" href="#">
          <Circle style={{ fontVariationSettings: "'FILL' 0" }} className="text-[24px] mb-1" aria-hidden={true} focusable="false" />
          <span className="text-label-sm font-label-sm">Account</span>
        </a>
      </nav>
    </>
  );
}
