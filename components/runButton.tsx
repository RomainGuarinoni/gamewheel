import style from '../styles/runButton.module.css';
import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function playButton({
  gameRunningStatus,
  setGameRunningStatus,
  wheelAnimationIsFinish,
  setWheelAnimationIsFinish,
}: {
  gameRunningStatus: boolean;
  setGameRunningStatus: (arg: boolean) => void;
  wheelAnimationIsFinish: boolean;
  setWheelAnimationIsFinish: (arg: boolean) => void;
}): JSX.Element {
  function setRunToTrue() {
    if (!gameRunningStatus) {
      setGameRunningStatus(true);
    } else if (gameRunningStatus && wheelAnimationIsFinish) {
      setWheelAnimationIsFinish(false);
    }
  }

  return (
    <div
      className={`${style.button} ${
        gameRunningStatus && !wheelAnimationIsFinish ? style.isRunning : ''
      }`}
      onClick={setRunToTrue}
    >
      {!wheelAnimationIsFinish ? (
        <div
          className={`${style.icon} ${
            gameRunningStatus ? style.isRunningLogo : ''
          }`}
        >
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
