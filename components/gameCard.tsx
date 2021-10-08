import style from '../styles/gameCard.module.css';
import Image from 'next/image';

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
}: {
  title: string;
  value: number;
  setValue: (arg: number) => void;
  png: string;
  setSum: (arg: number) => void;
  sum: number;
  run: boolean;
}): JSX.Element {
  const proba = (value / sum) * 100;

  return (
    <div className={`${style.container} ${run ? style.disappear : ''}`}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.image}>
        <Image src={require(`../assets/${png}.png`)} />
      </div>
      <p className={`${style.status} ${getProba(proba)} `}>
        {Math.round(proba * 10) / 10} %
      </p>
      <div className={style.range}>
        <input
          type='range'
          min='0'
          max='100'
          value={value}
          onChange={(e) => {
            setNewProba(setSum, sum, value, parseInt(e.target.value), setValue);
          }}
        />
      </div>
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
