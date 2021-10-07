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
  proba,
  setProba,
  setSum,
  sum,
}: {
  title: string;
  value: number;
  setValue: (arg: number) => void;
  png: string;
  proba: number;
  setProba: (arg: number) => void;
  setSum: (arg: number) => void;
  sum: number;
}): JSX.Element {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.image}>
        <Image src={require(`../assets/${png}.png`)} />
      </div>
      <p className={`${style.status} ${getColor(value)} `}>
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

function getColor(value: number): string {
  if (value < 25) {
    return style[Status.lowProbabilty];
  } else if (value < 75) {
    return style[Status.mediumProbabilty];
  } else {
    return style[Status.highProbabilty];
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
