import { seedSpojnice } from './seed-spojnice';
import { seedAsocijacije } from './seed-asocijacije';
import { seedWords } from './seed-words';
import { seedUsers } from './seed-users';
import { seedGameOfDay } from './seed-game-of-day';

export function seedAll() {
  Promise.all([seedSpojnice(), seedAsocijacije()]).then(() => seedGameOfDay());
  seedWords();
  seedUsers();
}
