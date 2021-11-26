import style from '../styles/popup.module.css';
import { useRef, useEffect } from 'react';

export default function PopUp({
  children,
  onClickOutside,
}: {
  children: JSX.Element;
  onClickOutside?: () => any;
}): JSX.Element {
  const popUpRef = useRef<HTMLDivElement>();

  function clickAction(e: MouseEvent) {
    if (!popUpRef || !popUpRef.current) {
      return;
    }

    if (popUpRef.current.contains(e.target as Node)) {
      return;
    }

    onClickOutside();
  }

  useEffect(() => {
    window.addEventListener('click', (e) => clickAction(e));

    return window.removeEventListener('click', (e) => clickAction(e));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.popup} ref={popUpRef}>
        {children}
      </div>
    </div>
  );
}
