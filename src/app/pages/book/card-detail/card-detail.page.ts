import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {Card} from '../../../models/Card';
import {UserService} from '../../../service/api/user.service';
import {SpellPromptService} from 'src/app/service/spell-prompt.service';
import {CardService} from '../../../service/api/card.service';
import {AppState, STATE_VARS} from '../../../models/AppState';
import {SharedDataService} from '../../../service/shared-data.service';
import {SpellBattleService} from '../../../service/ws/spell-battle.service';
import {SpellOption} from '../../../interfaces/message/spell';
import {TimerService} from '../../../service/timer.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {NotificationService} from '../../../service/notification.service';
import {IGetUserPropertyAPI} from '../../../interfaces/api/userProperty';
import {Battle} from '../../../models/Battle';
import {UserPropertyService} from '../../../service/api/user-property.service';
import {BattleService} from '../../../service/api/battle.service';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html',
    styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
    state: AppState;
    self?: User;
    card?: Card;

    constructor(private route: ActivatedRoute,
                private nav: NavController,
                private notificationService: NotificationService,
                private battleService: BattleService,
                private userService: UserService,
                private userPropertyService: UserPropertyService,
                private cardService: CardService,
                private timerService: TimerService,
                private sharedDataService: SharedDataService,
                private spellBattleService: SpellBattleService,
                private spellPromptService: SpellPromptService) {
    }

    ngOnInit() {
        this.sharedDataService.getStateObserver()
            .subscribe((data: AppState) => {
                this.state = data;
                this.self = data.myself as User;
                const cardNo = this.route.snapshot.paramMap.get('cardNo');
                if (!cardNo) {
                    // TODO: error
                    console.log('error');
                    return;
                }
                this.card = this.state.cards.find((card: Card) => {
                    return card.cardNo === +cardNo;
                });
                if (!this.card) {
                    // TODO: error
                    console.log('card not found for cardNo = ' + cardNo);
                    return;
                }
            });
    }

    async showPrompt(targetUser: User, card: Card) {
        const confirmCallback = async (data: SpellOption | undefined) => {
            // POST /card/:cardNo
            if (!card.spell.isInteractive) {
                this.cardService.postCard(card.cardNo, {
                    targetUserId: targetUser.id,
                    spellOption: data,
                }).subscribe((result: any) => {
                    this.notificationService.notifyMessage(result.message);
                    const myself = this.state.myself as User;

                    this.userPropertyService.getUserProperties(myself.id)
                        .toPromise()
                        .then((props: IGetUserPropertyAPI[]) => {
                            console.log(data);
                            this.sharedDataService.setState(STATE_VARS.PROPERTIES, props);
                        });
                    this.battleService.getAllBattles()
                        .toPromise()
                        .then((res: Battle[]) => {
                            console.log(res);
                            this.sharedDataService.setState(STATE_VARS.BATTLES, res);
                        });
                }, (result: any) => {
                    this.notificationService.notifyMessage(result.message);
                });
                return;
            }

            if (!this.self) {
                location.reload();
                return;
            }

            let inputOption: SpellOption;
            if (data) {
                inputOption = {
                    targetCardNo: +data.targetCardNo,
                    changeCardNo: +data.changeCardNo,
                };
                await this.spellBattleService.startSpellBattle(this.self, card, targetUser, inputOption);
            } else {
                await this.spellBattleService.startSpellBattle(this.self, card, targetUser);
            }
        };

        if (!this.self) {
            // TODO: error
            console.log('this.self is not set');
            return;
        }
        await this.spellPromptService.presentAttackAlertPrompt(this.self, card, targetUser, confirmCallback);
    }
}
