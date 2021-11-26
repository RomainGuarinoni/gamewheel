import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import gamesDefault, { Games } from '../utils/games';
import Loader from '../components/loader';
import GamesPages from '../components/gamesPages';
import DownloadPopup from '../components/downloadPopup';
import type { Dispatch, SetStateAction } from 'react';
import type { GetServerSideProps } from 'next';
import AddGame from '../components/addGame';
import axios from 'axios';
// import type { BeforeInstallPromptEvent } from '../beforeInstallPromptEvent';

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
  popUpStatus,
}: {
  defaultTheme: UserThemeType;
  popUpStatus: string;
}): JSX.Element {
  // The initial games object
  const [games, setGames] = useState<Games>(null);

  // The global theme of the app
  // Change the default "light" to defaultTheme
  const [theme, setTheme] = useState<UserThemeType>(defaultTheme || 'light');
  const themeValue = { theme, setTheme };

  // State for the Popup :
  // By default set to false. It can be set to true if the browser
  // app installed show that the app is not installed and that
  // the user hasn't click on close
  const [displayDownloadPopup, setDisplayDownloadPopup] =
    useState<boolean>(false);

  // State for the addGame popUp
  const [displayAddGamePopUp, setDisplayAddGamePopUp] = useState(true);

  // Initialize deferredPrompt for use later to show browser install prompt.
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  async function installPromptFunction(e) {
    // Display the install popUp
    if (popUpStatus !== 'close') {
      setDisplayDownloadPopup(true);
    }

    // Stash the event so it can be triggered later.
    setDeferredPrompt(e);
  }

  async function onInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setDisplayDownloadPopup(false);
        setDeferredPrompt(null);
      }

      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
    } else {
    }
  }

  async function onClose() {
    setDisplayDownloadPopup(false);

    axios({
      method: 'post',
      url: '/api/setCookie',
      data: {
        key: 'popUpStatus',
        value: 'close',
      },
    });
  }

  // Need to be fixed ...
  useEffect(() => {
    if (localStorage.getItem('games') !== null) {
      const localStorageGames = JSON.parse(localStorage.getItem('games'));
      setGames(gamesDefault);
    } else {
      setGames(gamesDefault);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) =>
      installPromptFunction(e)
    );

    return window.removeEventListener('beforeinstallprompt', (e) =>
      installPromptFunction(e)
    );
  }, []);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Head>
        <title>Game wheel</title>
      </Head>
      <UserTheme.Provider value={themeValue}>
        {displayDownloadPopup && (
          <DownloadPopup
            onClose={() => {
              onClose();
            }}
            onAction={() => {
              onInstall();
            }}
          />
        )}
        {!games && <Loader />}
        {games && <GamesPages games={games} />}
        {displayAddGamePopUp && (
          <AddGame close={() => setDisplayAddGamePopUp(false)} />
        )}
      </UserTheme.Provider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the headers of the incoming req
  const cookies = context.req.cookies;

  return {
    props: {
      defaultTheme: cookies.theme || null,
      popUpStatus: cookies.popUpStatus || null,
    },
  };
};
