import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Card} from '../models/Card';
import {SpellOption} from '../interfaces/message/spell';
import {User} from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class SpellPromptService {

    constructor(private alertController: AlertController) {
    }

    async presentAttackAlertPrompt(self: User, card: Card, target: User, confirmHandler: (data: SpellOption) => void) {
        let alertOptions: any;
        const spellOpts = this.getSpellOptions(confirmHandler, target);

        switch (card.name) {
            case 'rob':
                alertOptions = spellOpts.rob;
                break;
            default:
                alertOptions = spellOpts.default;
                break;
        }

        const alert = await this.alertController.create(alertOptions);
        await alert.present();
    }

    async presentDefenseAlertPrompt(card: Card, confirmHandler: () => void) {
        const alert = await this.alertController.create({
            header: card.nameJa,
            message: 'この防御スペルを使用しますか？',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('cancel');
                    }
                }, {
                    text: 'Okay',
                    handler: confirmHandler
                }
            ]
        });

        await alert.present();
    }

    private getSpellOptions(confirmHandler: (data: SpellOption) => void, target: User) {
        const buttons = [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'OK',
                handler: confirmHandler,
            }
        ];
        const spellOpts = {
            rob: {
                header: 'スペル実行オプション入力',
                message: '対象カードNoを入力してください',
                inputs: [
                    {
                        name: 'targetCardNo',
                        type: 'number',
                        min: 1,
                        max: 100
                    },
                ],
                buttons,
            },
            default: {
                header: '実行しますか？',
                message: `対象プレイヤー: ${target.name}`,
                buttons,
            }
        };
        return spellOpts;
    }
}

