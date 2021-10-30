import style from '../styles/gameCard.module.css';
import Slider from './slider';
import Image from 'next/image';
import { useEffect, useContext } from 'react';
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
  setSum,
  sum,
  run,
  runAnimation,
  winner,
}: {
  title: string;
  value: number;
  setValue: (arg: number) => void;
  png: string;
  setSum: (arg: number) => void;
  sum: number;
  run: boolean;
  runAnimation: boolean;
  winner: WinnerState;
}): JSX.Element {
  const proba = (value / sum) * 100;
  const { theme } = useContext(UserTheme);
  useEffect(() => {
    if (winner) {
      console.log(title);
    }
  }, [winner]);
  return (
    <div
      className={`${style.container} ${run ? style.cardAnimation : ''} ${
        runAnimation ? style.runAnimation : ''
      } ${setWinnerState(winner)} ${
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
        onChange={(e) => setNewProba(setSum, sum, value, e, setValue)}
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
  setSum: (arg: number) => void,
  sum: number,
  previousValue: number,
  newValue: number,
  setValue: (arg: number) => void
) {
  setSum(sum + (newValue - previousValue));
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
