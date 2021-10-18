import { Games } from './games';

export const ANIMATION_FAST_TIME = 0.1;

export const ANIMATION_SLOW_TIME = 0.2;

export enum WinnerState {
  inProgress,
  winner,
  looser,
}

function runAnimation(setAnimation: (arg: boolean) => void, timing: number) {
  return new Promise<void>((resolve) => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      resolve();
    }, timing * 1000);
  });
}

async function runAllAnimation(games: Games, timing: number) {
  for (let i = 0; i < games.length; i++) {
    await runAnimation(games[i].setAnimation, timing);
  }
}

/**
 *
 * @description Run the wheel animation
 * @param {Games} games  an array of all the games
 * @param {number} loopFast  the number of loops with fast delay
 * @param {number} loopSlow  the number of loops with slow delay
 * @param {(arg: boolean) => void} setFinish a setState function to indicate the end of the animation
 */

async function loopAnimation(
  games: Games,
  winner: Games[number],
  loopFast: number,
  loopSlow: number,
  setFinish: (arg: boolean) => void
) {
  for (let i = 0; i < loopFast; i++) {
    await runAllAnimation(games, ANIMATION_FAST_TIME);
  }
  for (let i = 0; i < loopSlow; i++) {
    await runAllAnimation(games, ANIMATION_SLOW_TIME);
  }

  const winnerIndex = games.findIndex(({ title }) => title === winner.title);

  for (let i = 0; i <= winnerIndex; i++) {
    await runAnimation(games[i].setAnimation, ANIMATION_SLOW_TIME);
  }

  games.forEach(({ setWinner }, index) => {
    if (index == winnerIndex) {
      setWinner(WinnerState.winner);
    } else {
      setWinner(WinnerState.looser);
    }
  });
  setFinish(true);
}

export default loopAnimation;
