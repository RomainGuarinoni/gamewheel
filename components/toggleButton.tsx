import style from '../styles/toggle.module.css';
import { UserThemeType } from '../pages/index';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function toggle({
  state,
  setState,
}: {
  state: UserThemeType;
  setState: (arg: UserThemeType) => void;
}): JSX.Element {
  console.log(state);
  function handleChange() {
    switch (state) {
      case 'dark':
        setState('light');
        break;
      case 'light':
        setState('dark');

        break;
      default:
        setState('light');
    }
  }

  return (
    <div
      className={`${style.container} ${state == 'light' ? 'dark' : 'light'}  `}
      onClick={handleChange}
    >
      <div
        className={`${style.dot} ${state == 'light' ? 'light' : 'dark'} ${
          state == 'light' ? style.left : style.right
        }`}
      ></div>

      <div
        className={`${style.icon} ${state == 'light' ? style.moon : style.sun}`}
      >
        {' '}
        <FontAwesomeIcon icon={icon(state)} />{' '}
      </div>
    </div>
  );
}

function icon(state: UserThemeType) {
  switch (state) {
    case 'dark':
      return faSun;
    case 'light':
      return faMoon;
  }
}
