import { Games } from './games';

export const ANIMATION_TIME = 0.2;

function runAnimation(setAnimation: (arg: boolean) => void) {
  return new Promise<void>((resolve) => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      resolve();
    }, ANIMATION_TIME * 1000);
  });
}

async function runAllAnimation(games: Games) {
  for (let i = 0; i < games.length; i++) {
    await runAnimation(games[i].setAnimation);
  }
}

function loopAnimation(games: Games, loop: number) {
  for (let i = 0; i < loop; i++) {
    runAllAnimation(games);
  }
}

export default loopAnimation;
