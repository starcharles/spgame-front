import { User } from './User';

export interface Room  {
    id: number;
    name: string;
    users: User[];
}
