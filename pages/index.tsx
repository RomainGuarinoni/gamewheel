import Head from 'next/head';
import styles from '../styles/index.module.css';
import RunButton from '../components/runButton';
import GameCard from '../components/gameCard';
import { useEffect, useState } from 'react';
import gamesDefault from '../utils/games';
import Save from '../components/save';
import type { Games } from '../utils/games';

export default function Index(): JSX.Element {
  // State set to tru when the wheel is running, false when not
  const [run, setRun] = useState(false);

  let games = gamesDefault;

  if (games.length == 0) {
    return <p>WAIT ...</p>;
  }
  //set up the different state value for each game
  games.forEach((game) => {
    const [value, setValue] = useState(game.default);
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
      localStorage.setItem('games', JSON.stringify(games));
      console.log(
        games.filter(({ title }) => title == findTheGameWinner(games))
      );
      setRun(false);
    }
  }, [run]);

  // does not work now
  // need to add preferences
  useEffect(() => {
    if (localStorage.getItem('games') !== null) {
      games = JSON.parse(localStorage.getItem('games'));
      console.log(games);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
          rel='stylesheet'
        />
        <title>Game wheel</title>
      </Head>
      <Save />
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

  console.log(Math.floor(Math.random() * gameArray.length - 1));
  return gameArray[Math.floor(Math.random() * gameArray.length - 1)];
}
