import { Coord } from './utils';

export interface Courier {
  id: string;
  uid: string;
  cc: number;
  name: string;
  lastname: string;
  driving_license: string;
  active: boolean;
  cellphone: number;
  coords: Coord
}
