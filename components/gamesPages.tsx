import styles from '../styles/index.module.css';
import RunButton from './runButton';
import GameCard from './gameCard';
import { useEffect, useState } from 'react';
import Save from './save';
import Winner from './Winner';
import type { Games } from '../utils/games';

export default function GamesPages({ games }: { games: Games }): JSX.Element {
  // State set to tru when the wheel is running, false when not
  const [run, setRun] = useState(false);

  const [winner, setWinner] = useState<Games[number]>();

  //set up the different state value for each game

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

  useEffect(() => {
    if (run) {
      console.log(games);
      localStorage.setItem('games', JSON.stringify(games));
      console.log(JSON.parse(localStorage.getItem('games')));
      setWinner(findTheGameWinner(games));
    }
  }, [run]);

  return (
    <div className={styles.container}>
      {run && winner && <Save />}
      {run && winner && <Winner winner={winner} sum={sum} setRun={setRun} />}
      <RunButton run={run} setRun={setRun} />
      <div className={styles.gameContainer}>
        {games.map((game) => (
          <GameCard
            key={game.title}
            title={game.title}
            png={game.png}
            value={game.value}
            setValue={game.setValue}
            setSum={setSum}
            sum={sum}
            run={run}
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
