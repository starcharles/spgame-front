import {User} from './User';
import {ChatMessage} from './ChatMessage';
import {Card} from './Card';
import {Battle} from './Battle';
import {IGetUserPropertyAPI} from '../interfaces/api/userProperty';

export interface AppState {
    myself: User | undefined;
    users: User[];
    cards: Card[];
    properties: IGetUserPropertyAPI[];
    messages: ChatMessage[];
    battles: Battle[];
    errors: any[];
}

export enum STATE_VARS {
    MYSELF = 'myself',
    USERS = 'users',
    CARDS = 'cards',
    PROPERTIES = 'properties',
    BATTLES = 'battles',
    MESSAGES = 'messages',
    ERRORS = 'errors',
}

