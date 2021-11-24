import { Games } from './games';

const ANIMATION_VERY_FAST = {
  loop: 3,
  timing: 0.05,
};
const ANIMATION_FAST = {
  loop: 1,
  timing: 0.1,
};
const ANIMATION_SLOW = {
  loop: 1,
  timing: 0.15,
};
const ANIMATION_VERY_SLOW = {
  loop: 1,
  timing: 0.2,
};

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
 * @description gameRunningStatus the wheel animation
 * @param {Games} games  an array of all the games
 * @param {number} loopFast  the number of loops with fast delay
 * @param {number} loopSlow  the number of loops with slow delay
 * @param {(arg: boolean) => void} setWheelAnimationIsFinish a setState function to indicate the end of the animation
 */

async function loopAnimation(
  games: Games,
  winner: Games[number],
  setWheelAnimationIsFinish: (arg: boolean) => void
) {
  for (let i = 0; i < ANIMATION_VERY_FAST.loop; i++) {
    await runAllAnimation(games, ANIMATION_VERY_FAST.timing);
  }
  for (let i = 0; i < ANIMATION_FAST.loop; i++) {
    await runAllAnimation(games, ANIMATION_FAST.timing);
  }
  for (let i = 0; i < ANIMATION_SLOW.loop; i++) {
    await runAllAnimation(games, ANIMATION_SLOW.timing);
  }

  const winnerIndex = games.findIndex(({ title }) => title === winner.title);

  for (let i = 0; i <= winnerIndex; i++) {
    await runAnimation(games[i].setAnimation, ANIMATION_VERY_SLOW.timing);
  }

  games.forEach(({ setWinner }, index) => {
    if (index == winnerIndex) {
      setWinner(WinnerState.winner);
    } else {
      setWinner(WinnerState.looser);
    }
  });
  setWheelAnimationIsFinish(true);
}

export default loopAnimation;
