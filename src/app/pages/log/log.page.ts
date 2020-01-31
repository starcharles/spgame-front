import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../../service/shared-data.service';
import {User} from '../../models/User';
import {AppState} from '../../models/AppState';
import {Battle, BattleType, SpellBattleState} from '../../models/Battle';
import {BattleService} from '../../service/api/battle.service';
import {Router} from '@angular/router';
import {RepositoryInitializerName} from '@angular-devkit/schematics/tasks/repo-init/options';

@Component({
    selector: 'app-log',
    templateUrl: './log.page.html',
    styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {

    constructor(private sharedDataService: SharedDataService,
                private battleService: BattleService,
                private router: Router) {
    }

    log = 'battle';
    self?: User;
    state: AppState;
    battles: Battle[];

    ngOnInit() {
        this.sharedDataService.getStateObserver()
            .subscribe(data => {
                this.state = data;
                this.self = data.myself;
            });

        this.battleService.getAllBattles()
            .subscribe(data => {
                this.battles = data;
                // console.log(data);
            });
    }

    onTap(btl: Battle) {
        console.log(btl);
        if (btl.state === SpellBattleState.Finished) {
            console.log('finished');
            this.router.navigate(['tabs', 'battle', btl.id, 'history']);
            return;
        }
        console.log('else');
        this.router.navigate(['tabs', 'battle', btl.id]);
    }

    toBattleTypeString(type: BattleType): string {
        let str = '';
        switch (type) {
            case BattleType.Spell:
                str = 'スペル戦闘';
                break;
            case BattleType.Battle:
                str = '物理戦闘';
                break;
        }
        return str;
    }

    toStateString(state: SpellBattleState): string {
        let str = '';
        switch (state) {
            case SpellBattleState.BattleStart:
                str = 'スペル開始';
                break;
            case SpellBattleState.WaitResponse:
                str = '反応待ち';
                break;
            case SpellBattleState.Executing:
                str = '実行中';
                break;
            case SpellBattleState.Finished:
                str = '終了';
                break;
        }
        return str;
    }

    getAttackSpellName(btl: Battle) {
        if (btl.battleHistories.length === 0) {
            // 遠距離呪文
            const cardName = btl.action;
            const card1 = this.state.cards.find(c => {
                return c.name === cardName;
            });

            return card1!.name;
        }
        const first = btl.battleHistories[0];
        const cardNo = first.cardNo;
        const card = this.state.cards.find(c => {
            return c.cardNo === cardNo;
        });
        if (!card) {
            return 'エラー：カードが見つかりません';
        }
        return card.nameJa;
    }

}
