import Head from 'next/head';
import { useState, createContext } from 'react';
import gamesDefault, { Games } from '../utils/games';
import GamesPages from '../components/gamesPages';
import cookie from 'cookie';
import type { Dispatch, SetStateAction } from 'react';
import type { GetServerSideProps } from 'next';

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
  defaultGames,
}: {
  defaultTheme: UserThemeType;
  defaultGames: string;
}): JSX.Element {
  // The initial games object
  const [games, setGames] = useState<Games>(
    (JSON.parse(defaultGames) as Games) || gamesDefault
  );

  // The global theme of the app
  // Change the default "light" to defaultTheme
  const [theme, setTheme] = useState<UserThemeType>(defaultTheme || 'light');
  const themeValue = { theme, setTheme };

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
        {games && <GamesPages games={games} />}
      </UserTheme.Provider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the headers of the incoming req
  const headers = context.req.headers.cookie;

  // Parse the headers
  if (headers) {
    const headersObject = cookie.parse(headers);
    return {
      props: {
        defaultTheme: headersObject.theme || null,
        defaultGames: headersObject.games || null,
      },
    };
  }
  return {
    props: {
      defaultTheme: null,
      defaultGames: null,
    },
  };
};
