export type Games = {
  title: string;
  default: number;
  png: string;
  value?: number;
  setValue?: (arg: number) => void;
}[];

const gamesDefault: Games = [
  {
    title: 'CS:GO',
    default: 70,
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
];

export default gamesDefault;
