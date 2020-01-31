import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {AlertController, PopoverController} from '@ionic/angular';
import {PopoverPage} from '../../component/popover/popover.page';
import {SharedDataService} from '../../service/shared-data.service';
import {AppState, STATE_VARS} from '../../models/AppState';
import {UserService} from '../../service/api/user.service';
import {PocketType} from '../../models/UserProperty';
import * as firebase from 'firebase';
import {User} from '../../models/User';
import {interval} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    signup: {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string
    } = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };
    state: AppState;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                public popoverController: PopoverController,
                public alertController: AlertController,
                public userService: UserService,
                private sds: SharedDataService,
                private store: Storage) {
    }

    ngOnInit() {
        this.sds.getStateObserver()
            .subscribe((data) => {
                this.state = data;
            });
    }

    async userRegister() {
        if (this.signup.password !== this.signup.passwordConfirm) {
            await this.presentPopover(null);
            return;
        }

        try {
            // TODO: check signup name uniqueness
            // checkNameIsUnique(name);

            const user = await this.afAuth.auth.createUserWithEmailAndPassword(this.signup.email, this.signup.password);
            // await this.afAuth.auth.sendSignInLinkToEmail(this.signup.email);
            if (!user.user) {
                return;
            }
            const token = await user.user.getIdToken();
            await this.store.set('token', token);

            const name = this.signup.name;
            const data = {
                user: {
                    name,
                },
                cards
            };
            // ユーザー登録
            const res = await this.userService.postUser(token, data).toPromise();
            const postUser = res.user;

            this.sds.setState(STATE_VARS.MYSELF, postUser);
            this.state.myself = postUser;
            // TODO: fix
            setTimeout(() => {
                this.router.navigate(['/tabs/home']);
            }, 2000);

        } catch (err) {
            console.log(err);
            await this.presentAlert(err);
        }
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverPage,
            event: ev,
            translucent: true,
        });
        return await popover.present();
    }

    async presentAlert(err: AuthError) {
        const alert = await this.alertController.create({
            header: '入力内容に問題があります',
            message: err.message,
            buttons: ['OK']
        });

        await alert.present();
    }
}

export interface AuthError {
    code: string;
    message: string;
}

const cards = [
    {
        cardNo: 1021,
        pocketType: PocketType.Spell,
    },
    {
        cardNo: 1003,
        pocketType: PocketType.Spell,
    },
    {
        cardNo: 1004,
        pocketType: PocketType.Spell,
    },
    {
        cardNo: 1018,
        pocketType: PocketType.Spell,
    },
    {
        cardNo: 1006,
        pocketType: PocketType.Spell,
    },
    {
        cardNo: 1500,
        pocketType: PocketType.Normal,
    },
    {
        cardNo: 1501,
        pocketType: PocketType.Normal,
    },
    {
        cardNo: 1,
        pocketType: PocketType.Special,
    },
];
