import { WinnerState } from './animation';

export type Games = {
  title: string;
  default: number;
  png: string | File;
  type: 'default' | 'custom';
  value?: number;
  setValue?: (arg: number) => void;
  animation?: boolean;
  setAnimation?: (arg: boolean) => void;
  winner?: WinnerState;
  setWinner?: (arg: WinnerState) => void;
}[];

const gamesDefault: Games = [
  {
    title: 'CS:GO',
    default: 0,
    png: 'csgo',
    type: 'default',
  },
  {
    title: 'GTA V',
    default: 70,
    png: 'gta',
    type: 'default',
  },
  {
    title: 'Monster Hunter World',
    default: 50,
    png: 'mhw',
    type: 'default',
  },
  {
    title: 'Echecs',
    default: 5,
    png: 'chess',
    type: 'default',
  },
  {
    title: 'Osu!',
    default: 5,
    png: 'osu',
    type: 'default',
  },
  {
    title: 'Payday',
    default: 20,
    png: 'payday',
    type: 'default',
  },
  {
    title: 'Rocket League',
    default: 5,
    png: 'rocketleague',
    type: 'default',
  },
  {
    title: 'The forest',
    default: 20,
    png: 'theforest',
    type: 'default',
  },
];

export default gamesDefault;
