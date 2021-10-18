import style from '../styles/runButton.module.css';
import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function playButton({
  run,
  setRun,
  finish,
  setFinish,
}: {
  run: boolean;
  setRun: (arg: boolean) => void;
  finish: boolean;
  setFinish: (arg: boolean) => void;
}): JSX.Element {
  function setRunToTrue() {
    if (!run) {
      setRun(true);
    } else if (run && finish) {
      setFinish(false);
    }
  }

  return (
    <div
      className={`${style.button} ${run && !finish ? style.isRunning : ''}`}
      onClick={setRunToTrue}
    >
      {!finish ? (
        <div className={`${style.icon} ${run ? style.isRunningLogo : ''}`}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      ) : (
        <div className={`${style.icon} `}>
          <FontAwesomeIcon icon={faUndo} />
        </div>
      )}
    </div>
  );
}
