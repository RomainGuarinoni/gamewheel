import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../styles/slider.module.css';

export default function Slider({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: number) => void;
}): JSX.Element {
  return (
    <div className={style.container}>
      <p>
        <FontAwesomeIcon icon={faThumbsDown} />
      </p>
      <input
        type='range'
        min='0'
        max='100'
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <p>
        <FontAwesomeIcon icon={faThumbsUp} />
      </p>
    </div>
  );
}
