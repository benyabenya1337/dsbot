import fs from 'fs';
import path from 'path';

export interface Result {
  user: string; // тег користувача
  outcome: 'win' | 'lose';
  date: string; // ISO рядок дати
}

export const resultsPath = path.join(__dirname, 'results.json');

export function saveResult(userTags: string[], outcome: 'win' | 'lose') {
  let results: Result[] = [];
  if (fs.existsSync(resultsPath)) {
    results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
  }

  const now = new Date().toISOString();
  userTags.forEach((tag) => {
    results.push({ user: tag, outcome, date: now });
  });

  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
}
