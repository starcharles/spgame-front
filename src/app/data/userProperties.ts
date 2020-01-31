import {PocketType, UserProperty} from '../models/UserProperty';

const userProperty: UserProperty[] = [
    {
        id: 1,
        userId: 1,
        cardNo: 1,
        pocketType: PocketType.Spell,
        isFake: false,
    }, {
        id: 2,
        userId: 2,
        cardNo: 2,
        pocketType: PocketType.Spell,
        isFake: false,
    }, {
        id: 3,
        userId: 2,
        cardNo: 3,
        pocketType: PocketType.Item,
        isFake: false,
    }
];

export {
    userProperty,
};


