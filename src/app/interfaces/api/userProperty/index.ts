import {PocketType, UserProperty} from '../../../models/UserProperty';
import {Card} from '../../../models/Card';

export interface IGetUserPropertyAPI {
    id: number;
    userId: number;
    cardNo: number;
    pocketType: PocketType;
    isFake: boolean; // スペル[贋作]により作られたカードか？
    card: Card;
}

