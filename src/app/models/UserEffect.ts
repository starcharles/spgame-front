// ユーザーにかかっている特殊効果
export interface UserEffect {
    id: number;
    userId: number;
    cardNo: number;
    effectType: EffectType;
    count: number; // 残り回数
}

export enum EffectType {
    Spell = 1, // 持続効果系スペル
    Item, // 所持,装備アイテム効果
}
