import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import gamesDefault, { Games } from '../utils/games';
import Loader from '../components/loader';
import GamesPages from '../components/gamesPages';
import DownloadPopup from '../components/downloadPopup';
import type { Dispatch, SetStateAction } from 'react';
import type { GetServerSideProps } from 'next';
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
  const [displayDownloadPopup, setDisplayDownloadPopup] = useState<boolean>(
    popUpStatus == 'false' ? false : true
  );

  // Initialize deferredPrompt for use later to show browser install prompt.
  let deferredPrompt: BeforeInstallPromptEvent;

  function installPromptFunction(e: BeforeInstallPromptEvent) {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();

    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    // Update UI notify the user they can install the PWA
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  }

  async function onInstall() {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
  }

  function appHasBeenInstalled() {
    // Hide the app-provided install promotion
    setDisplayDownloadPopup(false);

    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;

    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');

    axios({
      method: 'post',
      url: '/api/setCookie',
      data: {
        key: 'popUpStatus',
        value: 'coucou',
      },
    });
  }

  async function onClose() {
    setDisplayDownloadPopup(false);

    axios({
      method: 'post',
      url: '/api/setCookie',
      data: {
        key: 'popUpStatus',
        value: false,
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
      installPromptFunction(e as BeforeInstallPromptEvent)
    );

    return window.removeEventListener('beforeinstallprompt', (e) =>
      installPromptFunction(e as BeforeInstallPromptEvent)
    );
  }, []);

  useEffect(() => {
    window.addEventListener('appinstalled', appHasBeenInstalled);
    return window.removeEventListener('appinstalled', appHasBeenInstalled);
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
