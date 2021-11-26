import style from '../styles/downloadPopup.module.css';
import Image from 'next/image';
import PopUp from './popUp';
export default function DownloadPopup({
  onAction,
  onClose,
}: {
  onAction: (...arg: any) => void;
  onClose: (...arg: any) => void;
}): JSX.Element {
  return (
    <PopUp>
      <div className={style.container}>
        <h2 className={style.title}>Installez Game Wheel ! </h2>
        <div className={style.containerInfo}>
          <div className={style.image}>
            <Image
              src={require('../public/icon_512.png')}
              width={150}
              height={150}
            />
          </div>
          <div className={style.info}>
            <p>
              Game wheel est maintenant disponible en tant{' '}
              <span className={style.strong}>qu'application de bureau !</span>{' '}
            </p>
            <p>
              Plus besoin de lancer google Chrome et de taper l'URL dans la
              barre de recherche, un{' '}
              <span className={style.strong}>simple clique sur l'icone</span> et
              Game Wheel se lance{' '}
            </p>
            <p>
              <span className={style.strong}>
                Aucune connexion internet requise !
              </span>{' '}
            </p>
            <div className={style.boutonBox}>
              <button
                className={`${style.bouton} ${style.install}`}
                onClick={() => onAction()}
              >
                Installer
              </button>
              <button
                className={`${style.bouton} ${style.close}`}
                onClick={() => onClose()}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
}
