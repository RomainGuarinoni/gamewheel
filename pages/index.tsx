import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import gamesDefault, { Games } from '../utils/games';
import Loader from '../components/loader';
import GamesPages from '../components/gamesPages';
import type { Dispatch, SetStateAction } from 'react';

export type UserThemeType = 'light' | 'dark';

export const UserTheme = createContext<{
  theme: UserThemeType;
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}>({
  theme: 'light',
  setTheme: () => {},
});

export default function Index({
  defaultTheme,
}: {
  defaultTheme: UserThemeType;
}): JSX.Element {
  // The initial games object
  const [games, setGames] = useState<Games>(null);

  // The global theme of the app
  // Change the default "light" to defaultTheme
  const [theme, setTheme] = useState<UserThemeType>('light');
  const themeValue = { theme, setTheme };

  useEffect(() => {
    if (localStorage.getItem('games') !== null) {
      const localStorageGames = JSON.parse(localStorage.getItem('games'));
      console.log('PRESET', localStorageGames);
      setGames(gamesDefault);
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
      <UserTheme.Provider value={themeValue}>
        {!games && <Loader />}
        {games && <GamesPages games={games} />}
      </UserTheme.Provider>
    </div>
  );
}
