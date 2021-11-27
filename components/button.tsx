import { MouseEventHandler, useRef, useEffect, useState } from 'react';
import style from '../styles/button.module.css';
const colors = {
  main: '#2196f3',
  darkMain: '#01579b',
  darkMainHover: '#044374',
  green: '#4caf50',
  greenHover: '#358838',
  orange: '#ff9800',
  orangeHover: '#e08a07',
  red: '#f44336',
  redHover: '#cf352a',
  black: '212121',
  light: '#fffff',
  dark: '#2c2c2c',
} as const;

const colorName = [
  'main',
  'darkMain',
  'green',
  'orange',
  'red',
  'black',
  'light',
  'dark',
] as const;

type Colors = typeof colorName[number];

export default function Button({
  label,

  background,
  disabled,
  bold,
  onClick,
  paddingVertical,
  paddingHorizontal,
}: {
  label: string;
  background: Colors;
  disabled?: boolean;
  bold?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  paddingVertical?: number;
  paddingHorizontal?: number;
}): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>();

  const [hover, setHover] = useState(false);

  useEffect(() => {
    buttonRef?.current.addEventListener('mouseover', (e: MouseEvent) => {
      setHover(true);
    });

    return buttonRef?.current.removeEventListener(
      'mouseover',
      (e: MouseEvent) => {
        setHover(true);
      }
    );
  }, [buttonRef]);

  useEffect(() => {
    buttonRef?.current.addEventListener('mouseleave', (e: MouseEvent) => {
      setHover(false);
    });

    return buttonRef?.current.removeEventListener(
      'mouseleave',
      (e: MouseEvent) => {
        setHover(false);
      }
    );
  }, [buttonRef]);

  return (
    <button
      className={`${style.button} ${disabled ? style.disabled : ''}`}
      style={{
        padding: computePadding(paddingVertical, paddingHorizontal),
        background: disabled
          ? colors['dark']
          : hover
          ? colors[`${background}Hover`]
          : colors[background],
      }}
      ref={buttonRef}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function computePadding(
  paddingVertical: number = 0.8,
  paddingHorizontal: number = 1.3
): string {
  return `${paddingVertical}rem ${paddingHorizontal}rem`;
}
