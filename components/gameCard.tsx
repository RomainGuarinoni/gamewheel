import style from '../styles/gameCard.module.css';
import Image from 'next/image';

export default function gameCard(): JSX.Element {
  return (
    <div className={style.container}>
      <h2>CSGO</h2>
      <div className={style.image}>
        <Image src={require('../assets/csgo.png')} />
      </div>
    </div>
  );
}
