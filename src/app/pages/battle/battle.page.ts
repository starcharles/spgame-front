import {Component, OnInit} from '@angular/core';
import {Card, CardType} from '../../models/Card';
import {SharedDataService} from '../../service/shared-data.service';
import {SpellType} from '../../models/SpellCard';
import {AppState, STATE_VARS} from '../../models/AppState';
import {TimerService} from '../../service/timer.service';
import {SpellBattleService} from '../../service/ws/spell-battle.service';
import {Observable} from 'rxjs/index';
import {ActivatedRoute} from '@angular/router';
import {SpellPromptService} from '../../service/spell-prompt.service';
import {ActionType, BattleHistory} from '../../models/battleHistory';
import {ISpellResultMessage} from '../../interfaces/message/spell';
import {IGetUserPropertyAPI} from '../../interfaces/api/userProperty';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.page.html',
    styleUrls: ['./battle.page.scss'],
})
export class BattlePage implements OnInit {

    constructor(public route: ActivatedRoute,
                public spellBattleService: SpellBattleService,
                public spellPromptService: SpellPromptService,
                private sharedDataService: SharedDataService,
                private timerService: TimerService) {

    }

    state: AppState;
    playerRole: string | null;
    defenseSpellCards: IGetUserPropertyAPI[] = [];

    counter: Observable<number>;
    showResult = false;
    result: ISpellResultMessage;

    // info
    battleId: number;
    attackedUserNames: string[];
    attackSpell: Card | undefined;
    targetCard: Card | undefined;

    ngOnInit() {
        this.playerRole = this.route.snapshot.queryParamMap.get('player');
        this.sharedDataService.getStateObserver()
            .subscribe((data: AppState) => {
                this.state = data;
                this.defenseSpellCards = this.getDefenseSpell(data.properties);
                this.showBattleInfo();
            });

        this.counter = this.timerService.getTimerObservable();

        this.spellBattleService.spellResponse
            .subscribe((data: ISpellResultMessage) => {
                console.log('/battle.page [recv]spell_result');
                console.log(data);
                this.showResult = true;
                this.result = data;
            });
    }

    private showBattleInfo() {
        const btl = this.state.battles[this.state.battles.length - 1];
        this.battleId = btl.id;
        const btlHists = btl.battleHistories;
        let latestHist: BattleHistory | undefined;

        for (const hist of btlHists) {
            if (hist.actionType === ActionType.Attack) {
                latestHist = hist;
                this.attackSpell = this.state.cards.find(card => {
                    return hist.cardNo === card.cardNo;
                });
                break;
            }
        }
        if (!this.attackSpell) {
            // TODO: エラーログ、エラー通知
            console.log(`Error`);
            return;
        }

        this.targetCard = this.state.cards.find(card => {
            if (!latestHist || !latestHist.targetCardNo) {
                return false;
            }
            return card.cardNo === latestHist.targetCardNo;
        });

        this.attackedUserNames = btl.attacked.map(user => {
            return user.name;
        });
    }

    private getDefenseSpell(properties: IGetUserPropertyAPI[]): IGetUserPropertyAPI[] {
        // TODO: use SQLite?
        const cards = this.state.cards;


        const props = properties.filter(prop => {
            return prop.card.cardType === CardType.Spell;
        }).filter(p => {
            for (const card of cards) {
                if (p.card.cardNo === card.cardNo) {
                    return card.spell.spellType === SpellType.Defense;
                }
            }
        });
        return props;
    }

    async showPrompt(card: Card, battleId: number) {
        // TODO: move to spell-prompt.service.ts
        const confirmCallback = async () => {
            // stop timer
            this.timerService.stopTimer();
            // send response
            await this.spellBattleService.sendSpellResponse(battleId, card.cardNo);
            // remove used from state
            this.removeUsedCard(card.cardNo);
        };

        await this.spellPromptService.presentDefenseAlertPrompt(card, confirmCallback);
    }

    removeUsedCard(cardNo: number) {
        const props = this.state.properties;
        const prop = props.find((item) => {
            return item.card.cardNo === cardNo;
        });

        if (!prop) {
            // TODO Error
            console.log('error');
            return;
        }

        const newProps = props.filter((p) => {
            return p.id !== prop.id;
        });

        this.sharedDataService.setState(STATE_VARS.PROPERTIES, newProps);
    }
}
