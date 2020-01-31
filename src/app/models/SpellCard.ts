export interface SpellCard {
    cardNo: number;
    spellType: SpellType; // 攻撃、防御、持続、その他
    targetType: TargetType; // 遠距離、近距離
    isInteractive: boolean; // プレイヤー間相互作用必要か？
    isMultipleTarget: boolean; // 複数対象かどうか
}

export enum SpellType {
    Attack = 'attack', // 近距離攻撃呪文
    Normal = 'normal', // 通常呪文
    Defense = 'defense', // 攻撃スペル防御
    DefenseNormal = 'defense-normal', // 通常スペル防御
    None = 'none',
}

export enum TargetType {
    Short = 1,
    Long,
}
