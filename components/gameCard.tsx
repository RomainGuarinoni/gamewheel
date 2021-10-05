import style from '../styles/gameCard.module.css';
import Image from 'next/image';
import { JSXElementConstructor, useState } from 'react';

enum Status {
  highProbabilty = 'Très probable',
  mediumProbabilty = 'Probable',
  lowProbabilty = 'Peu probable',
}

const DEFAULT_PROBABILTY = 20;

export default function gameCard(): JSX.Element {
  const [probabilty, setProbabilty] = useState(DEFAULT_PROBABILTY);

  return (
    <div className={style.container}>
      <h2 className={style.title}>CSGO</h2>
      <div className={style.image}>
        <Image src={require('../assets/csgo.png')} />
      </div>
      <p className={`${style.status} `}>{displayStatus(probabilty)}</p>
      <div className={style.range}>
        <input
          type='range'
          min='0'
          max='100'
          defaultValue={DEFAULT_PROBABILTY}
          onChange={(e) => {
            setProbabilty(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

function displayStatus(proba: number): JSX.Element {
  if (proba < 25) {
    return <span className={style.lowProbabilty}>{Status.lowProbabilty}</span>;
  } else if (proba < 75) {
    return (
      <span className={style.mediumProbabilty}>{Status.mediumProbabilty}</span>
    );
  } else {
    return (
      <span className={style.highProbabilty}>{Status.highProbabilty}</span>
    );
  }
}
