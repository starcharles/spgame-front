import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedDataService} from '../../../service/shared-data.service';
import {ActionType, BattleHistory} from '../../../models/battleHistory';
import {Battle} from '../../../models/Battle';
import {AppState} from '../../../models/AppState';
import {Card} from '../../../models/Card';
import {AttackType, BattleResult} from '../../../models/battleResult';

@Component({
    selector: 'app-battle-history',
    templateUrl: './battle-history.page.html',
    styleUrls: ['./battle-history.page.scss'],
})
export class BattleHistoryPage implements OnInit {

    constructor(private route: ActivatedRoute,
                private sharedDataService: SharedDataService) {
    }

    state: AppState;
    battle?: Battle;
    btlHists: BattleHistory[];
    results: BattleResult[];

    ngOnInit() {
        this.sharedDataService.getStateObserver()
            .subscribe(data => {
                this.state = data;
                const battleId = this.route.snapshot.paramMap.get('battleId');
                if (!battleId) {
                    throw new Error('Battle IDが見つかりません.');
                }

                this.battle = data.battles.find(btl => {
                    return btl.id === +battleId;
                });
                if (!this.battle) {
                    throw new Error('error: Battle not found for battleId =' + battleId);
                }
                const compare = (a: BattleHistory, b: BattleHistory) => {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }

                    return 0;
                };

                this.btlHists = this.battle.battleHistories.sort(compare);
                this.results = this.battle.battleResults;
            });
    }

    userIdToName(userId: number) {
        const user = this.state.users.find((usr) => {
            return usr.id === userId;
        });
        return user!.name;
    }

    actionTypeToString(actionType: ActionType) {

        switch (actionType) {
            case ActionType.Attack:
                return '攻撃開始';
                break;
            case ActionType.IsAttacked:
                return '攻撃を受けた. 猶予時間中。';
                break;
            case ActionType.Defense:
                return '防御スペルを使用した.';
                break;
        }
    }

    attackTypeToString(attackType: AttackType) {

        switch (attackType) {
            case AttackType.THIEF:
                return '奪った';
                break;
            case AttackType.DESTROY:
                return '破壊した';
                break;
            case AttackType.CHANGE:
                return '変更させた';
                break;
            case AttackType.FAIL:
                return 'カード効果発動失敗';
                break;
        }
    }

    cardNoToNameJa(cardNo: number): string {
        const card = this.getCardByCardNo(cardNo);
        return card.nameJa;
    }

    getCardByCardNo(cardNo: number): Card {
        const card = this.state.cards.find(c => {
            return c.cardNo === cardNo;
        });
        if (!card) {
            throw new Error('card not found');
        }
        return card;
    }

}
