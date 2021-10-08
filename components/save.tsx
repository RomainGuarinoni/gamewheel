import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../styles/save.module.css';

export default function Save(): JSX.Element {
  //   useEffect(() => {}, []);

  return (
    <div className={style.container}>
      <FontAwesomeIcon icon={faSave} />
      <p className={style.p}>Sauvegarde ...</p>
    </div>
  );
}
