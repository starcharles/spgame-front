import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {rooms} from '../data/room';
import {users} from '../data/users';
import {cardData} from '../data/cards';
import {userProperty} from '../data/userProperties';
import {self} from '../data/self';


@Injectable()
export class InMemoryDataService implements InMemoryDbService {

    constructor() {
    }

    createDb() {
        return {
            rooms,
            users,
            cards: cardData,
            userProperties: userProperty,
            self,
        };
    }
}
