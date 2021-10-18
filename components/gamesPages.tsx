import styles from '../styles/index.module.css';
import RunButton from './runButton';
import GameCard from './gameCard';
import { useEffect, useRef, useState } from 'react';
import Save from './save';
import loopAnimation from '../utils/animation';
import type { Games } from '../utils/games';
import { WinnerState } from '../utils/animation';

export default function GamesPages({ games }: { games: Games }): JSX.Element {
  // State set to true when the wheel is running, false when not
  const [run, setRun] = useState(false);

  games.forEach((game) => {
    const [value, setValue] = useState(game?.value | game.default);
    const [animation, setAnimation] = useState(false);
    const [winner, setWinner] = useState(WinnerState.inProgress);
    game.value = value;
    game.setValue = setValue;
    game.animation = animation;
    game.setAnimation = setAnimation;
    game.winner = winner;
    game.setWinner = setWinner;
  });

  //sum is the sum of each value of each game
  const [sum, setSum] = useState(
    games
      .map(({ value }) => {
        return value;
      })
      .reduce((previous, current) => previous + current)
  );

  useEffect(() => {
    if (run) {
      //find a winner

      const winner = findTheGameWinner(games);
      loopAnimation(games, winner, 3, 2);
    }
  }, [run]);
  return (
    <div className={styles.container}>
      {run && <Save />}
      <RunButton run={run} setRun={setRun} />
      <div className={styles.gameContainer}>
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
            runAnimation={game.animation}
            winner={game.winner}
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
