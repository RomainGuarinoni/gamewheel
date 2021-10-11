import style from '../styles/runButton.module.css';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function playButton({
  run,
  setRun,
}: {
  run: boolean;
  setRun: (arg: boolean) => void;
}): JSX.Element {
  function setRunToTrue() {
    if (!run) {
      setRun(true);
    }
  }

  return (
    <div
      className={`${style.button} ${run ? style.isRunning : ''}`}
      onClick={setRunToTrue}
    >
      <div className={`${style.icon} ${run ? style.isRunningLogo : ''}`}>
        <FontAwesomeIcon icon={faPlay} />
      </div>
    </div>
  );
}
