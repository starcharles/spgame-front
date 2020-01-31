import {User} from './User';

export interface GeoLocation {
  id: number;
  user_id: number;
  coords: Coordinates;
  timestamp: number;
}
