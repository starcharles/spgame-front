import {Card, CardRank, CardType} from '../models/Card';

const cardData: any[] = [
    {
        id: 1,
        name: 'rob',
        cardNo: 1021,
        rank: CardRank.B,
        cardType: CardType.Spell,
        limit: 100,
    },
    {
        id: 2,
        name: 'defensiveWall',
        rank: CardRank.D,
        cardNo: 1003,
        cardType: CardType.Spell,
        limit: 100,
    },
    {
        id: 3,
        name: 'stone',
        rank: CardRank.Z,
        cardNo: 10000,
        cardType: CardType.Item,
        limit: 100000,
    },
    {
        id: 4,
        name: 'garbage',
        rank: CardRank.Z,
        cardNo: 10001,
        cardType: CardType.Item,
        limit: 100000,
    }
];

export {
    cardData,
};
