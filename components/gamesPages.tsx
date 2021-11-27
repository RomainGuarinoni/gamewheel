import styles from '../styles/index.module.css';
import RunButton from './runButton';
import GameCard from './gameCard';
import { useEffect, useState, useContext } from 'react';
import Save from './save';
import Toggle from './toggleButton';
import Button from './button';
import loopAnimation from '../utils/animation';
import { WinnerState } from '../utils/animation';
import { UserTheme } from '../pages/index';
import type { Games } from '../utils/games';

export default function GamesPages({
  games,
  setAddGames,
}: {
  games: Games;
  setAddGames: (arg: boolean) => void;
}): JSX.Element {
  // State for the wheel state

  // gameRunningStatus is :
  //   - true -> when the wheel is running and the user has not restart the game yet
  //   - false -> when the userr is changing card proba
  const [gameRunningStatus, setGameRunningStatus] = useState(false);

  // wheelAnimationIsFinish is :
  //   - true -> When the wheel animation has ended
  //   - false -> all other time
  const [wheelAnimationIsFinish, setWheelAnimationIsFinish] = useState(false);

  // The global app theme
  const { theme, setTheme } = useContext(UserTheme);

  // initiate game card state variable
  games.forEach((game) => {
    // Value is a number between 0 and 100 determine by
    // the slider which correspond to the number of
    // time the games will appear in the final arrray
    const [value, setValue] = useState(game?.value | game.default);

    // When the animation is set to true, the card begin
    // brighter then darker
    const [animation, setAnimation] = useState(false);

    const [winner, setWinner] = useState(WinnerState.inProgress);

    game.value = value;
    game.setValue = setValue;
    game.animation = animation;
    game.setAnimation = setAnimation;
    game.winner = winner;
    game.setWinner = setWinner;
  });

  const [totalGamesValue, setTotalGamesValue] = useState(
    games
      .map(({ value }) => {
        return value;
      })
      .reduce((previous, current) => previous + current)
  );

  useEffect(() => {
    if (gameRunningStatus) {
      //find a winner
      const winner = findTheGameWinner(games);

      //gameRunningStatus the wheel animation
      loopAnimation(games, winner, setWheelAnimationIsFinish);
    }
  }, [gameRunningStatus]);

  useEffect(() => {
    if (!wheelAnimationIsFinish) {
      games.forEach(({ setWinner, setAnimation }) => {
        setWinner(WinnerState.inProgress);
        setAnimation(false);
      });
      setGameRunningStatus(false);
    }
  }, [wheelAnimationIsFinish]);

  return (
    <div
      className={`${styles.container} ${theme === 'light' ? 'light' : 'dark'}`}
    >
      {gameRunningStatus && <Save />}
      <RunButton
        gameRunningStatus={gameRunningStatus}
        setGameRunningStatus={setGameRunningStatus}
        wheelAnimationIsFinish={wheelAnimationIsFinish}
        setWheelAnimationIsFinish={setWheelAnimationIsFinish}
      />
      <div className={styles.toggle}>
        <Button
          label='Add'
          background='main'
          onClick={() => setAddGames(true)}
        />
        <Toggle state={theme} setState={setTheme} />
      </div>
      <div className={styles.gameContainer}>
        {games.map((game, index) => (
          <GameCard
            key={game.title}
            title={game.title}
            png={game.png}
            type={game.type}
            value={game.value}
            setValue={game.setValue}
            setTotalGamesValue={setTotalGamesValue}
            totalGamesValue={totalGamesValue}
            gameRunningStatus={gameRunningStatus}
            runAnimation={game.animation}
            winner={game.winner}
            wheelAnimationIsFinish={wheelAnimationIsFinish}
            setWheelAnimationIsFinish={setWheelAnimationIsFinish}
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
