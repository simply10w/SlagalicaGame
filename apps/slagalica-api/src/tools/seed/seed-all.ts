import { seedSpojnice } from './seed-spojnice';
import { seedAsocijacije } from './seed-asocijacije';
import { seedWords } from './seed-words';
import { seedUsers } from './seed-users';

export function seedAll() {
  seedSpojnice();
  seedAsocijacije();
  seedWords();
  seedUsers();
}
