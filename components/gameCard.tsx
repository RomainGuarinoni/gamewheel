import style from '../styles/gameCard.module.css';
import Slider from './slider';
import Image from 'next/image';
import { useContext } from 'react';
import { WinnerState } from 'utils/animation';
import { UserTheme } from '../pages/index';

enum Status {
  highProbabilty = 'highProbabilty',
  mediumProbabilty = 'mediumProbabilty',
  lowProbabilty = 'lowProbabilty',
}

export default function gameCard({
  title,
  value,
  setValue,
  png,
  setTotalGamesValue,
  totalGamesValue,
  gameRunningStatus,
  runAnimation,
  winner,
  wheelAnimationIsFinish,
  setWheelAnimationIsFinish,
}: {
  title: string;
  value: number;
  setValue: (arg: number) => void;
  png: string;
  setTotalGamesValue: (arg: number) => void;
  totalGamesValue: number;
  gameRunningStatus: boolean;
  runAnimation: boolean;
  winner: WinnerState;
  wheelAnimationIsFinish: boolean;
  setWheelAnimationIsFinish: (arg: boolean) => void;
}): JSX.Element {
  const proba = (value / totalGamesValue) * 100;
  const { theme } = useContext(UserTheme);

  return (
    <div
      className={`${style.container} ${
        gameRunningStatus && !wheelAnimationIsFinish ? style.cardAnimation : ''
      } ${runAnimation ? style.runAnimation : ''} ${setWinnerState(winner)} ${
        theme === 'light' ? style.light : style.dark
      } `}
    >
      <h2 className={`${style.title} ${theme === 'light'}`}>{title}</h2>
      <div className={style.image}>
        <Image src={require(`../assets/${png}.png`)} />
      </div>
      <p className={`${style.status} ${getProba(proba)} `}>
        {Math.round(proba * 10) / 10} %
      </p>
      <Slider
        value={value}
        onChange={(e) =>
          setNewProba(
            setTotalGamesValue,
            totalGamesValue,
            value,
            e,
            setValue,
            wheelAnimationIsFinish,
            setWheelAnimationIsFinish
          )
        }
      />
    </div>
  );
}

export function getProba(proba: number): string {
  if (proba < 10) {
    return Status.lowProbabilty;
  } else if (proba < 25) {
    return Status.mediumProbabilty;
  } else {
    return Status.highProbabilty;
  }
}

function setNewProba(
  setTotalGamesValue: (arg: number) => void,
  totalGamesValue: number,
  previousValue: number,
  newValue: number,
  setValue: (arg: number) => void,
  wheelAnimationIsFinish: boolean,
  setWheelAnimationIsFinish: (arg: boolean) => void
) {
  //check if the game is over
  if (wheelAnimationIsFinish) {
    setWheelAnimationIsFinish(false);
  }
  setTotalGamesValue(totalGamesValue + (newValue - previousValue));
  setValue(newValue);
}

function setWinnerState(winnerState: WinnerState) {
  if (winnerState === WinnerState.inProgress) {
    return '';
  } else if (winnerState === WinnerState.winner) {
    return style.winner;
  } else {
    return style.looser;
  }
}
