import style from '../styles/gameCard.module.css';
import Slider from './slider';
import Image from 'next/image';
import { ANIMATION_TIME } from '../utils/animation';

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
  delay,
}: {
  title: string;
  value: number;
  setValue: (arg: number) => void;
  png: string;
  setSum: (arg: number) => void;
  sum: number;
  run: boolean;
  runAnimation: boolean;
  delay: number;
}): JSX.Element {
  const proba = (value / sum) * 100;
  return (
    <div
      className={`${style.container} ${run ? style.cardAnimation : ''}`}
      style={
        runAnimation
          ? {
              animation: `${style.cardSelected} ${ANIMATION_TIME}s ease ${delay}s `,
            }
          : {}
      }
    >
      <h2 className={style.title}>{title}</h2>
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
