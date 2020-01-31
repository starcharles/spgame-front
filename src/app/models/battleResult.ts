export interface BattleResult {
    id: number;
    battleId: number;
    fromUserId: number;
    toUserId: number;
    cardNo: number;
    attackType: AttackType;
    targetCardNo: number;
    changeToCardNo: number;
}

export enum AttackType {
    DESTROY = 'destroy',
    THIEF = 'thief',
    CHANGE = 'change',
    FAIL = 'fail',
}
