import style from '../styles/loader.module.css';

export default function Loader(): JSX.Element {
  return (
    <div className={style.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
