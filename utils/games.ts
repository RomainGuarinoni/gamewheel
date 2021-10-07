type Games = {
  title: string;
  default: number;
  png: string;
  value?: number;
  setValue?: (arg: number) => void;
  proba?: number;
  setProba?: (arg: number) => void;
}[];

const games: Games = [
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
];

export default games;
