import { getRandomNumber } from '@slagalica/common';
import { Skocko, SkockoPositionResult } from '@slagalica/data';
import { last } from 'lodash';

export const WINNER_POINTS = 10;

export function getPositionResults(goal: Skocko[], sequence: Skocko[]) {
  const goalSet = new Set(goal);
  return sequence.map((seqItem, index) => {
    if (goal[index] === seqItem) return SkockoPositionResult.InPosition;
    else if (goalSet.has(seqItem)) return SkockoPositionResult.WrongPosition;
    else return SkockoPositionResult.NotInSequence;
  });
}

export function hasGotItRight(player: {
  tries: { result: SkockoPositionResult[] }[];
}) {
  const lastTry = last(player.tries);
  return lastTry.result.every(
    result => result === SkockoPositionResult.InPosition
  );
}

export function usedAllTries(player: {
  tries: { result: SkockoPositionResult[] }[];
}) {
  return player.tries.length >= 6;
}

export function getGoal() {
  const options = [
    Skocko.Herc,
    Skocko.Pik,
    Skocko.Srce,
    Skocko.Tref,
    Skocko.Zvezda,
    Skocko.Skocko
  ];

  const goal: Skocko[] = [];
  for (let i = 0; i < 4; i++) {
    const optionIndex = getRandomNumber({ min: 0, max: options.length - 1 });
    goal.push(options[optionIndex]);
  }

  return goal;
}
