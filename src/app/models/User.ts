export interface User {
    id: number;
    hp: number;
    gold: number;
    roomId: number;
    socketId: string;
    name: string;
    state: UserState;
    location: string;
    online: boolean;
    uid: string;
    isAdmin: boolean;
}

export enum UserState {
    Battle = 1,
    Field,
    Shop,
}
