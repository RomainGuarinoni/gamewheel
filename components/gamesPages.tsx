import styles from '../styles/index.module.css';
import RunButton from './runButton';
import GameCard from './gameCard';
import { useEffect, useRef, useState } from 'react';
import Save from './save';
import { ANIMATION_TIME } from '../utils/animation';
import type { Games } from '../utils/games';

export default function GamesPages({ games }: { games: Games }): JSX.Element {
  // State set to true when the wheel is running, false when not
  const [run, setRun] = useState(false);
  const [runAnimation, setRunAnimation] = useState(false);
  const [winner, setWinner] = useState<Games[number]>();

  const gamesContainerRef = useRef<HTMLDivElement>();
  const tl = useRef<any>();

  games.forEach((game) => {
    const [value, setValue] = useState(game?.value | game.default);
    game.value = value;
    game.setValue = setValue;
  });

  //sum is the sum of each value of each game
  const [sum, setSum] = useState(
    games
      .map(({ value }) => {
        return value;
      })
      .reduce((previous, current) => previous + current)
  );

  async function playAnimationAsync() {
    for (let i = 0; i < 3; i++) {
      console.log(runAnimation);
      await playAnimation();
    }
  }

  function playAnimation() {
    return new Promise<void>((resolve) => {
      setRunAnimation(true);
      setTimeout(() => {
        setRunAnimation(false);
        resolve();
      }, ANIMATION_TIME * 1000 * games.length);
    });
  }

  useEffect(() => {
    if (run) {
      //find a winner

      setWinner(findTheGameWinner(games));
      playAnimationAsync();
    }
  }, [run]);
  return (
    <div className={styles.container}>
      {run && winner && <Save />}
      {/* {run && winner && <Winner winner={winner} sum={sum} setRun={setRun} />} */}
      <RunButton run={run} setRun={setRun} />
      <div className={styles.gameContainer} ref={gamesContainerRef}>
        {games.map((game, index) => (
          <GameCard
            key={game.title}
            title={game.title}
            png={game.png}
            value={game.value}
            setValue={game.setValue}
            setSum={setSum}
            sum={sum}
            run={run}
            runAnimation={runAnimation}
            delay={index * ANIMATION_TIME}
          />
        ))}
      </div>
    </div>
  );
}

function findTheGameWinner(games: Games) {
  const gameArray: string[] = [];
  games.forEach(({ value, title }) => {
    for (let i = 0; i < value; i++) {
      gameArray.push(title);
    }
  });
  const index = Math.floor(Math.random() * gameArray.length - 1);

  return games.find(({ title }) => title === gameArray[index]);
}
