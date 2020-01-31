export interface BattleHistory {
    id: number;
    battleId: number;
    userId: number;
    actionType: ActionType;
    action: string;
    cardNo: number;
    targetCardNo?: number;
    changeCardNo?: number;
}

export enum ActionType {
    Attack = 'attack',
    IsAttacked = 'is_attacked',
    Defense = 'defense',
}
