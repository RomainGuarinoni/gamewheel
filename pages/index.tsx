import Head from 'next/head';

import { useEffect, useState } from 'react';
import gamesDefault, { Games } from '../utils/games';
import Loader from '../components/loader';
import GamesPages from '../components/gamesPages';

export default function Index(): JSX.Element {
  // does not work now
  // need to add preferences

  const [games, setGames] = useState<Games>(null);

  useEffect(() => {
    if (localStorage.getItem('games') !== null) {
      const localStorageGames = JSON.parse(localStorage.getItem('games'));
      console.log('PRESET', localStorageGames);
      setGames(localStorageGames);
    } else {
      setGames(gamesDefault);
    }
  }, []);

  return (
    <div>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
          rel='stylesheet'
        />
        <title>Game wheel</title>
      </Head>
      {!games && <Loader />}
      {games && <GamesPages games={games} />}
    </div>
  );
}
