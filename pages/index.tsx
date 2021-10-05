import Head from 'next/head';
import styles from '../styles/index.module.css';
import RunButton from '../components/runButton';
import GameCard from '../components/gameCard';

export default function Index(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
          rel='stylesheet'
        />
      </Head>
      <RunButton />
      <div className={styles.gameContainer}>
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </div>
  );
}
