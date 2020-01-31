import {SpellCard} from './SpellCard';

export interface Card {
    id: number;
    name: string;
    nameJa: string;
    cardNo: number;
    content: string;
    rank: CardRank;
    limit: number; // カード化限度枚数
    cardType: CardType;
    spell: SpellCard;
}


export enum TargetType {
    None = 0,
    Short = 1,
    Long,
}

export enum CardRank {
    SS = 1,
    S,
    A,
    B,
    C,
    D,
    E,
    F,
    Z,
}

export enum CardType {
    Item = 1,
    Spell,
    Monster,
}
