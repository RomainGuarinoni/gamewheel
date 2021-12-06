import { WinnerState } from './animation';

export type Games = {
  title: string;
  default: number;
  png: string;
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
  },
  {
    title: 'GTA V',
    default: 70,
    png: 'gta',
  },
  {
    title: 'Monster Hunter World',
    default: 50,
    png: 'mhw',
  },
  {
    title: 'Echecs',
    default: 5,
    png: 'chess',
  },
  {
    title: 'Osu!',
    default: 5,
    png: 'osu',
  },
  {
    title: 'Payday',
    default: 20,
    png: 'payday',
  },
  {
    title: 'Rocket League',
    default: 5,
    png: 'rocketleague',
  },
  {
    title: 'The forest',
    default: 20,
    png: 'theforest',
  },
  {
    title: 'Valheim',
    default: 10,
    png: 'valheim',
  },
];

export default gamesDefault;
