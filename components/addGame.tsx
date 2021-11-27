import Image from 'next/image';
import PopUp from './popUp';
import Slider from './slider';
import style from '../styles/addGame.module.css';
import Button from './button';
import { Games } from '../utils/games';
import { useState, useEffect } from 'react';

type error = { scope: 'name' | 'url'; txt: string }[];

export default function AddGame({
  close,
  games,
  setGames,
}: {
  close: () => void;
  games: Games;
  setGames: (arg: Games) => void;
}): JSX.Element {
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<FileList[number]>(null);
  const [value, setValue] = useState(50);
  const [error, setError] = useState<error>([]);

  function uploadGame() {
    if (name && url) {
      setGames(
        games.concat({
          title: name,
          default: value,
          png: url,
          type: 'custom',
        })
      );
      close();
    }
  }

  // Listen the name and url
  useEffect(() => {
    const errorTemp: error = [];
    if (name === '') {
      errorTemp.push({
        scope: 'name',
        txt: 'The name of the game is missing',
      });
    } else {
      errorTemp.filter(({ scope }) => scope !== 'name');
    }
    if (url === null) {
      errorTemp.push({
        scope: 'url',
        txt: 'The image of the game is missing',
      });
    } else {
      errorTemp.filter(({ scope }) => scope !== 'url');
    }

    setError(errorTemp);
  }, [name, url]);

  return (
    <PopUp size='large'>
      <div className={style.container}>
        <h2 className={style.title}>Add a new game</h2>
        <div className={style.cardContainer}>
          <div className={style.card}>
            <div className={style.nameContainer}>
              <input
                type='text'
                placeholder='Game name'
                value={name}
                className={style.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {url === null ? (
              <div className={style.urlContainer}>
                <input
                  type='file'
                  id='urlLoaderInput'
                  className={style.url}
                  accept='image/*'
                  onChange={(e) => {
                    setUrl((e.target as HTMLInputElement).files[0]);
                  }}
                />
                <label htmlFor='urlLoaderInput' className={style.urlButton}>
                  Upload an image
                </label>
              </div>
            ) : (
              <div className={style.imageContainer}>
                <div className={style.image}>
                  <Image
                    src={URL.createObjectURL(url)}
                    width={500}
                    height={260}
                  />
                </div>
                <div className={style.imageButtonContainer}>
                  <Button
                    label='Remove the picture'
                    background='orange'
                    onClick={(e) => {
                      e.preventDefault();
                      setUrl(null);
                    }}
                  />
                </div>
              </div>
            )}
            <div className={style.slider}>
              <p>Default value : </p>
              <div className={style.value}>
                <Slider value={value} onChange={setValue} />
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.boutonsContainer}>
              <Button
                bold
                onClick={() => {
                  uploadGame();
                }}
                background='green'
                label='Confirm'
                disabled={error.length !== 0}
              />
              <Button
                onClick={() => close()}
                label='Cancel'
                bold
                background='red'
              />
            </div>
            <ul className={style.ul}>
              {error.map(({ txt, scope }) => (
                <li key={scope} className={style.li}>
                  {' '}
                  {txt}{' '}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PopUp>
  );
}

{
}
