export function getRandomNumber({ min, max }: { min: number; max: number }) {
  return Math.floor(Math.random() * (max - min)) + min;
}
