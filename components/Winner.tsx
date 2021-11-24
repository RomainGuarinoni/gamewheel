import { Games } from '../utils/games';
import style from '../styles/winner.module.css';
import { getProba } from './gameCard';
import Image from 'next/image';

export default function Winner({
  winner,
  setGameRunningStatus,
  totalGamesValue,
}: {
  winner: Games[number];
  setGameRunningStatus: (arg: boolean) => void;
  totalGamesValue: number;
}): JSX.Element {
  const image = require(`../assets/${winner.png}.png`);

  return (
    <div className={style.container}>
      <h2 className={style.title}> {winner.title} </h2>
      <p
        className={`${getProba((winner.value / totalGamesValue) * 100)} ${
          style.proba
        }`}
      >
        {' '}
        {Math.round((winner.value / totalGamesValue) * 100 * 10) / 10}{' '}
        <span className={style.pourcentage}>%</span>
      </p>
      {/* <Image src={require(`../assets/${winner.png}.png`)} layout='fixed' /> */}

      <button
        className={style.button}
        onClick={() => setGameRunningStatus(false)}
      >
        Recommencer
      </button>
    </div>
  );
}
