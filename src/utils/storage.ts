import type { HighScoreEntry } from '../types/domain';

const HIGH_SCORES_KEY = 'tetris-high-scores';
const HIGH_SCORE_KEY = 'tetris-high-score';

export function getHighScores(): HighScoreEntry[] {
  try {
    const raw = localStorage.getItem(HIGH_SCORES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (e): e is HighScoreEntry =>
          e &&
          typeof e.score === 'number' &&
          typeof e.level === 'number' &&
          typeof e.lines === 'number' &&
          typeof e.date === 'string'
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  } catch {
    return [];
  }
}

export function saveHighScore(entry: HighScoreEntry): HighScoreEntry[] {
  const scores = getHighScores();
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score);
  const top10 = scores.slice(0, 10);
  try {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(top10));
  } catch {
    // Storage full or unavailable
  }
  return top10;
}

export function getHighScore(): number {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    if (!raw) return 0;
    const val = parseInt(raw, 10);
    return isNaN(val) ? 0 : val;
  } catch {
    return 0;
  }
}

export function setHighScore(score: number): void {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // Storage unavailable
  }
}

export function clearAllData(): void {
  try {
    localStorage.removeItem(HIGH_SCORES_KEY);
    localStorage.removeItem(HIGH_SCORE_KEY);
  } catch {
    // Ignore
  }
}
