import { getRandomNumber } from './numbers';

const LETTERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'R',
  'S',
  'T',
  'U',
  'V',
  'Z',
  'Č',
  'Ć',
  'Ž',
  'Š',
  'Đ'
];

export function getRandomLatinLetter() {
  return LETTERS[getRandomNumber({ min: 0, max: LETTERS.length - 1 })];
}
