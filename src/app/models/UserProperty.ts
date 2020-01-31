// ユーザーの所持するカード情報(ブックと同じ)
export interface UserProperty {
    id: number;
    userId: number;
    cardNo: number;
    pocketType: PocketType;
    isFake: boolean; // スペル[贋作]により作られたカードか？
}

export enum PocketType {
    Special = 1, // 指定ポケット
    Normal, // フリーポケット
    Spell, // スペルポケット
    Item, // 現物アイテム
}
