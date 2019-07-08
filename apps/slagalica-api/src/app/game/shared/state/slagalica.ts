import { getRandomLatinLetter } from '@slagalica/common';

export function calculatePoints(word: string) {
  return word.length * 2;
}

export function getLetters() {
  const letters: string[] = [];
  for (let i = 0; i < 12; i++) {
    letters.push(getRandomLatinLetter());
  }
  return letters;
}

export function validateWord(letters: string[], word: string) {
  const charTable = letters.reduce((table, letter) => {
    table[letter] = table[letter] ? table[letter] + 1 : 1;
    return table;
  }, {});
  for (const char of word) {
    if (!charTable[char]) return false;
    if (charTable[char]) {
      if (charTable[char] > 0) charTable[char]--;
      else return false;
    }
  }
  return true;
}
