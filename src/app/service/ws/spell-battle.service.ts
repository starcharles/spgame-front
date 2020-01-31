import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs/index';
import {SocketIoService} from './socketio.service';
import {ISpellResponseMessage, ISpellStartMessage, SpellOption} from '../../interfaces/message/spell';
import {TimerService} from '../timer.service';
import {Card} from '../../models/Card';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class SpellBattleService {

    public spellStart: Subject<any>;
    public spellResponse: Subject<any>;

    constructor(public navCtrl: NavController,
                public router: Router,
                public ngZone: NgZone,
                private sioService: SocketIoService,
                private timerService: TimerService) {
        this.spellStart = sioService.spellStart();
        this.spellResponse = sioService.spellResponse();
    }

    public async startSpellBattle(self: User, card: Card, targetUser: User, options?: SpellOption) {
        const msg: ISpellStartMessage = {
            cardNo: card.cardNo,
            usedBy: self.id,
            targetUserId: targetUser.id,
            spellOption: options,
        };
        this.sendSpellStart(msg);
        this.timerService.startTimer();
    }

    public sendSpellResponse(battleId: number, cardNo: number, spellOption?: SpellOption) {
        const data: ISpellResponseMessage = {
            battleId,
            cardNo,
            spellOption,
        };
        console.log(`[emit_ev: spell_response]`);
        console.log(data);
        this.spellResponse.next(data);
    }

    private sendSpellStart(msg: ISpellStartMessage) {
        this.spellStart.next(msg);
        console.log(`[emit ev]spell_start`);
        console.log(msg);
    }


}
