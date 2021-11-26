import style from '../styles/popup.module.css';
import { useRef, useEffect } from 'react';

export default function PopUp({
  children,
  onClickOutside,
  size = 'normal',
}: {
  children: JSX.Element;
  onClickOutside?: () => any;
  size?: 'normal' | 'large';
}): JSX.Element {
  const popUpRef = useRef<HTMLDivElement>();

  function clickAction(e: MouseEvent) {
    if (!popUpRef || !popUpRef.current) {
      return;
    }

    if (popUpRef.current.contains(e.target as Node)) {
      return;
    }

    try {
      console.log('yeah');
      onClickOutside();
    } finally {
      return;
    }
  }

  useEffect(() => {
    window.addEventListener('click', (e) => clickAction(e));

    return window.removeEventListener('click', (e) => clickAction(e));
  }, []);

  return (
    <div className={`${style.container} `}>
      <div
        className={`${style.popup} ${
          size === 'normal' ? style.normal : style.large
        }`}
        ref={popUpRef}
      >
        {children}
      </div>
    </div>
  );
}
