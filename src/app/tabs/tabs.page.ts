import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';

import {AppState, STATE_VARS} from '../models/AppState';
import {SharedDataService} from '../service/shared-data.service';
import {ISpellAttackedMessage, ISpellResultMessage} from '../interfaces/message/spell';
import {SpellBattleService} from '../service/ws/spell-battle.service';
import {Router} from '@angular/router';
import {Battle, BattleType, SpellBattleState} from '../models/Battle';
import {TimerService} from '../service/timer.service';
import {IChatMessage} from '../interfaces/message/chat';
import {IUserJoinMessage, IUserLeftMessage} from '../interfaces/message/connection';
import {ChatService} from '../service/ws/chat.service';
import {ConnectionService} from '../service/ws/connection.service';
import {IGetUserPropertyAPI} from '../interfaces/api/userProperty';
import {UserPropertyService} from '../service/api/user-property.service';
import {environment} from '../../environments/environment';
import {ActionType, BattleHistory} from '../models/battleHistory';
import {SocketIoService} from '../service/ws/socketio.service';
import {BattleService} from '../service/api/battle.service';
import {BattleResult} from '../models/battleResult';
import {GeolocationService} from '../service/geolocation.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
    constructor(public toastController: ToastController,
                private sharedDataService: SharedDataService,
                private userPropertyService: UserPropertyService,
                private battleService: BattleService,
                private chatService: ChatService,
                private connectionService: ConnectionService,
                private timerService: TimerService,
                private storage: Storage,
                private router: Router,
                private spellBattleService: SpellBattleService,
                private sioService: SocketIoService,
    ) {
    }

    state: AppState;

    async ngOnInit() {
        this.sharedDataService.getStateObserver()
            .subscribe(async (data) => {
                this.state = data;
            });

        this.sioService.myError()
            .subscribe((data) => {
                console.log('my-error');
                console.log(data);
            });

        this.setSpellBattleObservers();
        this.setChatObservers();
    }

    private setChatObservers() {
        this.chatService.messages
            .subscribe((data: IChatMessage) => {
                const msgs = this.state.messages;
                msgs.push(data);
                this.sharedDataService.setState(STATE_VARS.MESSAGES, msgs);
            });
        this.connectionService.addUser
            .subscribe((data: IUserJoinMessage) => {
                const msg: IChatMessage = {
                    userId: data.userId,
                    userName: data.userName,
                    message: `${data.userName} joined`,
                    sendDate: new Date(),

                };
                const msgs = this.state.messages;
                msgs.push(msg);
                this.sharedDataService.setState(STATE_VARS.MESSAGES, msgs);
            });

        this.connectionService.userLeft
            .subscribe((data: IUserLeftMessage) => {
                const msg: IChatMessage = {
                    userId: data.userId,
                    userName: data.userName,
                    message: `${data.userName} left`,
                    sendDate: new Date(),

                };
                const msgs = this.state.messages;
                msgs.push(msg);
                this.sharedDataService.setState(STATE_VARS.MESSAGES, msgs);
            });
    }

    private setSpellBattleObservers() {
        this.spellBattleService.spellStart
            .subscribe(async (data: ISpellAttackedMessage) => {
                // start timer
                this.timerService.startTimer();

                // show attacked.
                const attacker = this.state.users.find(user => {
                    return user.id === data.userId;
                });
                const spellCard = this.state.cards.find(card => {
                    return card.cardNo === data.cardNo;
                });

                if (!attacker || !spellCard || !this.state.myself) {
                    // TODO: error
                    return;
                }

                const lastBattleHistories: BattleHistory[] = this.state.battles[this.state.battles.length - 1].battleHistories;
                let lastBtlHistoryId = 0;

                for (const btlHist of lastBattleHistories) {
                    if (btlHist.id > lastBtlHistoryId) {
                        lastBtlHistoryId = btlHist.id;
                    }
                }

                let targetCardNo;
                let changeCardNo;
                if (data.spellOption) {
                    if (data.spellOption.targetCardNo) {
                        targetCardNo = data.spellOption.targetCardNo;
                    }
                    if (data.spellOption.changeCardNo) {
                        changeCardNo = data.spellOption.changeCardNo;
                    }
                }

                // TODO: refactor
                const btl = new Battle(
                    data.battleId,
                    1, // TODO: roomId をマッチング結果によって買える
                    BattleType.Spell,
                    spellCard.name,
                    attacker.id,
                    SpellBattleState.BattleStart,
                    attacker,
                    [this.state.myself],
                    [{
                        id: lastBtlHistoryId,
                        battleId: data.battleId,
                        userId: attacker.id,
                        actionType: ActionType.Attack,
                        action: spellCard.name,
                        cardNo: spellCard.cardNo,
                        targetCardNo,
                        changeCardNo,
                    }]
                    , [{}] as BattleResult[],
                );

                // バトルデータ、historyの更新
                this.state.battles.push(btl);
                this.sharedDataService.setState(STATE_VARS.BATTLES, this.state.battles);

                if (attacker.id !== this.state.myself.id) {
                    const msg = `プレイヤー"${attacker.name}" があなたに対し "${spellCard.nameJa}"を使用しました。` +
                        `\n${environment.spellTimeout / 1000}秒以内の防御スペル応答が可能です。`;
                    await this.presentToastWithOptions(data.battleId, 'defense', msg);
                    return;
                }

                if (attacker.id === this.state.myself.id) {
                    const msg = `プレイヤー "${attacker.name}"が"${spellCard.nameJa}" を使用しました。\n` +
                        `${environment.spellTimeout / 1000}秒以内の反応を待っています。\n`;

                    await this.presentToastWithOptions(data.battleId, 'attack', msg);
                    return;
                }
            });

        this.spellBattleService.spellResponse
            .subscribe((data: ISpellResultMessage) => {
                console.log('[recv]spell_result');
                if (!this.state.myself) {
                    // TODO: error
                    console.log('error');
                    return;
                }
                this.timerService.stopTimer();
                this.userPropertyService.getUserProperties(this.state.myself.id)
                    .toPromise()
                    .then((props: IGetUserPropertyAPI[]) => {
                        console.log(data);
                        this.sharedDataService.setState(STATE_VARS.PROPERTIES, props);
                    });
                this.battleService.getAllBattles()
                    .toPromise()
                    .then((res: Battle[]) => {
                        // console.log(res);
                        this.sharedDataService.setState(STATE_VARS.BATTLES, res);
                    });
            });

    }

    private async presentToastWithOptions(battleId: number, type: 'attack' | 'defense', message: string, showClose = true) {
        const text = 'OK';

        const toast = await this.toastController.create({
            message,
            showCloseButton: showClose,
            position: 'top',
            closeButtonText: text
        });
        await toast.present();

        if (await toast.onDidDismiss()) {
            const queryParams = {
                player: ''
            };

            if (type === 'attack') {
                queryParams.player = 'attacker';
            }
            await this.router.navigate(['tabs', 'battle', battleId], {
                queryParams
            });
        }
    }

}
