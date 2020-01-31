import {User} from './User';
import {BattleHistory} from './battleHistory';
import {BattleResult} from './battleResult';

export enum BattleType {
    Spell = 1,
    Battle,
}

export enum SpellBattleState {
    BattleStart = 1,
    WaitResponse,
    Executing,
    Finished,
}

export class Battle {
    constructor(public id: number,
                public roomId: number,
                public type: BattleType,
                public action: string,
                public attackerId: number,
                public state: SpellBattleState,
                public attacker: User,
                public attacked: User[],
                public battleHistories: BattleHistory[],
                public battleResults: BattleResult[],
                ) {
    }

    // methods
    public isWaitingResponse(): boolean {
        return this.state === SpellBattleState.WaitResponse;
    }

    public isSingleTarget(): boolean {
        return this.attacked.length === 1;
    }
}

