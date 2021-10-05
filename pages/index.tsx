import Head from 'next/head';
import styles from '../styles/index.module.css';
import RunButton from '../components/runButton';
import GameCard from '../components/gameCard';
import { useState } from 'react';

export default function Index(): JSX.Element {
  const [run, setRun] = useState(false);

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
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />

        <GameCard />

        <GameCard />

        <GameCard />

        <GameCard />

        <GameCard />

        <GameCard />

        <GameCard />

        <GameCard />
      </div>
    </div>
  );
}
