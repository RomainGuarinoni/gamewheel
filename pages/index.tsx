import Head from 'next/head';
import styles from '../styles/index.module.css';
import RunButton from '../components/runButton';
import GameCard from '../components/gameCard';
import { useEffect, useState } from 'react';
import games from '../utils/games';

export default function Index(): JSX.Element {
  // State set to tru when the wheel is running, false when not
  const [run, setRun] = useState(false);

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

  games.forEach((game) => {
    const [proba, setProba] = useState((game.value / sum) * 100);
    game.proba = proba;
    game.setProba = setProba;
  });

  useEffect(() => {
    games.forEach((game) => {
      game.setProba((game.value / sum) * 100);
    });
  }, [sum]);

  return (
    <div className={styles.container}>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
          rel='stylesheet'
        />
        <title>Game wheel</title>
      </Head>
      <RunButton run={run} setRun={setRun} />
      <div className={styles.gameContainer}>
        {games.map((game) => (
          <GameCard
            key={game.title}
            title={game.title}
            png={game.png}
            value={game.value}
            setValue={game.setValue}
            proba={game.proba}
            setProba={game.setProba}
            setSum={setSum}
            sum={sum}
          />
        ))}
      </div>
    </div>
  );
}
