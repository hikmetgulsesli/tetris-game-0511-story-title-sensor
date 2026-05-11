export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type GamePhase = 'menu' | 'playing' | 'paused' | 'gameover' | 'controls' | 'options' | 'ranks';

export interface Position {
  x: number;
  y: number;
}

export interface ActivePiece {
  type: TetrominoType;
  x: number;
  y: number;
  rotation: number;
}

export type BoardCell = TetrominoType | null;

export type GameBoard = BoardCell[][];

export interface GameState {
  phase: GamePhase;
  board: GameBoard;
  currentPiece: ActivePiece | null;
  nextPieces: TetrominoType[];
  holdPiece: TetrominoType | null;
  canHold: boolean;
  score: number;
  level: number;
  lines: number;
  highScore: number;
  combo: number;
  backToBack: boolean;
  bag: TetrominoType[];
}

export interface HighScoreEntry {
  score: number;
  level: number;
  lines: number;
  date: string;
}

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#38BDF8',
  O: '#FACC15',
  T: '#A855F7',
  S: '#4ADE80',
  Z: '#FB923C',
  J: '#3B82F6',
  L: '#EF4444',
};

export const TETROMINOES: Record<TetrominoType, number[][][]> = {
  I: [
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[0, 2], [1, 2], [2, 2], [3, 2]],
    [[1, 0], [1, 1], [1, 2], [1, 3]],
  ],
  O: [
    [[1, 0], [2, 0], [1, 1], [2, 1]],
  ],
  T: [
    [[0, 1], [1, 1], [2, 1], [1, 0]],
    [[1, 0], [1, 1], [1, 2], [2, 1]],
    [[0, 1], [1, 1], [2, 1], [1, 2]],
    [[1, 0], [1, 1], [1, 2], [0, 1]],
  ],
  S: [
    [[1, 0], [2, 0], [0, 1], [1, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
    [[1, 1], [2, 1], [0, 2], [1, 2]],
    [[0, 0], [0, 1], [1, 1], [1, 2]],
  ],
  Z: [
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[2, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [1, 2], [2, 2]],
    [[1, 0], [0, 1], [1, 1], [0, 2]],
  ],
  J: [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [2, 2]],
    [[1, 0], [1, 1], [0, 2], [1, 2]],
  ],
  L: [
    [[2, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 1], [1, 1], [2, 1], [0, 2]],
    [[0, 0], [1, 0], [1, 1], [1, 2]],
  ],
};

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const VISIBLE_HEIGHT = 20;

export function createEmptyBoard(): GameBoard {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
}

export function getPieceCells(piece: ActivePiece): Position[] {
  const shape = TETROMINOES[piece.type][piece.rotation % TETROMINOES[piece.type].length];
  return shape.map(([dx, dy]) => ({ x: piece.x + dx, y: piece.y + dy }));
}

export function isValidPosition(board: GameBoard, piece: ActivePiece): boolean {
  const cells = getPieceCells(piece);
  return cells.every(({ x, y }) => {
    if (x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT) return false;
    if (y < 0) return true; // Above board is fine
    return board[y][x] === null;
  });
}

export function lockPiece(board: GameBoard, piece: ActivePiece): GameBoard {
  const newBoard = board.map(row => [...row]);
  const cells = getPieceCells(piece);
  for (const { x, y } of cells) {
    if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
      newBoard[y][x] = piece.type;
    }
  }
  return newBoard;
}

export function clearLines(board: GameBoard): { board: GameBoard; linesCleared: number } {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }
  return { board: newBoard, linesCleared };
}

export function calculateScore(linesCleared: number, level: number, isHardDrop: boolean, dropDistance: number): number {
  let points = 0;
  const lineScores = [0, 100, 300, 500, 800];
  points += (lineScores[linesCleared] || 0) * level;
  if (isHardDrop) {
    points += dropDistance * 2;
  } else {
    points += dropDistance;
  }
  return points;
}

export function getDropInterval(level: number): number {
  return Math.max(50, Math.floor(1000 * Math.pow(0.8, level - 1)));
}

export function getGhostY(board: GameBoard, piece: ActivePiece): number {
  let ghostY = piece.y;
  while (isValidPosition(board, { ...piece, y: ghostY + 1 })) {
    ghostY++;
  }
  return ghostY;
}

// Wall kick tables (simplified SRS)
const WALL_KICKS_JLSTZ: Record<string, Position[]> = {
  '0->1': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }],
  '1->0': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
  '1->2': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
  '2->1': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }],
  '2->3': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }],
  '3->2': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
  '3->0': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
  '0->3': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }],
};

const WALL_KICKS_I: Record<string, Position[]> = {
  '0->1': [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }],
  '1->0': [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }],
  '1->2': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }],
  '2->1': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
  '2->3': [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }],
  '3->2': [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }],
  '3->0': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
  '0->3': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }],
};

export function getWallKicks(type: TetrominoType, fromRotation: number, toRotation: number): Position[] {
  const key = `${fromRotation}->${toRotation}`;
  if (type === 'I') {
    return WALL_KICKS_I[key] || [{ x: 0, y: 0 }];
  }
  return WALL_KICKS_JLSTZ[key] || [{ x: 0, y: 0 }];
}

export function tryRotate(board: GameBoard, piece: ActivePiece, direction: 1 | -1): ActivePiece | null {
  const rotations = TETROMINOES[piece.type].length;
  const newRotation = ((piece.rotation + direction) % rotations + rotations) % rotations;
  const kicks = getWallKicks(piece.type, piece.rotation, newRotation);

  for (const kick of kicks) {
    const rotated = {
      ...piece,
      rotation: newRotation,
      x: piece.x + kick.x,
      y: piece.y + kick.y,
    };
    if (isValidPosition(board, rotated)) {
      return rotated;
    }
  }
  return null;
}

export function shuffleBag(): TetrominoType[] {
  const bag: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

export function fillQueue(queue: TetrominoType[], bag: TetrominoType[]): { queue: TetrominoType[]; bag: TetrominoType[] } {
  let newQueue = [...queue];
  let newBag = [...bag];
  while (newQueue.length < 5) {
    if (newBag.length === 0) {
      newBag = shuffleBag();
    }
    newQueue.push(newBag.shift()!);
  }
  return { queue: newQueue, bag: newBag };
}

export function spawnPiece(type: TetrominoType): ActivePiece {
  return {
    type,
    x: 3,
    y: 0,
    rotation: 0,
  };
}

export function getInitialGameState(highScore: number = 0): GameState {
  const { queue, bag } = fillQueue([], []);
  const current = spawnPiece(queue.shift()!);
  const { queue: nextQueue, bag: newBag } = fillQueue(queue, bag);

  return {
    phase: 'playing',
    board: createEmptyBoard(),
    currentPiece: current,
    nextPieces: nextQueue,
    holdPiece: null,
    canHold: true,
    score: 0,
    level: 1,
    lines: 0,
    highScore,
    combo: 0,
    backToBack: false,
    bag: newBag,
  };
}

export function isGameOver(board: GameBoard, piece: ActivePiece): boolean {
  return !isValidPosition(board, piece);
}

export function processLock(state: GameState, dropDistance: number = 0, isHardDrop: boolean = false): GameState {
  if (!state.currentPiece) return state;

  const newBoard = lockPiece(state.board, state.currentPiece);
  const { board: clearedBoard, linesCleared } = clearLines(newBoard);

  const newLines = state.lines + linesCleared;
  const newLevel = Math.floor(newLines / 10) + 1;

  const lineScore = calculateScore(linesCleared, state.level, isHardDrop, dropDistance);
  const newScore = state.score + lineScore;
  const newHighScore = Math.max(state.highScore, newScore);

  const nextType = state.nextPieces[0];
  if (!nextType) return state;

  const remainingQueue = state.nextPieces.slice(1);
  const { queue: filledQueue, bag: newBag } = fillQueue(remainingQueue, state.bag);

  const newPiece = spawnPiece(nextType);

  if (isGameOver(clearedBoard, newPiece)) {
    return {
      ...state,
      phase: 'gameover',
      board: clearedBoard,
      currentPiece: null,
      score: newScore,
      level: newLevel,
      lines: newLines,
      highScore: newHighScore,
      nextPieces: filledQueue,
      bag: newBag,
      canHold: true,
      combo: 0,
    };
  }

  return {
    ...state,
    board: clearedBoard,
    currentPiece: newPiece,
    nextPieces: filledQueue,
    bag: newBag,
    canHold: true,
    score: newScore,
    level: newLevel,
    lines: newLines,
    highScore: newHighScore,
    combo: linesCleared > 0 ? state.combo + 1 : 0,
  };
}

export function tickGame(state: GameState): GameState {
  if (state.phase !== 'playing' || !state.currentPiece) return state;

  const dropped = { ...state.currentPiece, y: state.currentPiece.y + 1 };
  if (isValidPosition(state.board, dropped)) {
    return { ...state, currentPiece: dropped };
  }

  // Piece locked
  return processLock(state, 0, false);
}
