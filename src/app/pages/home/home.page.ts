import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {MenuController} from '@ionic/angular';
import {UserService} from '../../service/api/user.service';
import {User} from '../../models/User';
import {SharedDataService} from '../../service/shared-data.service';
import {AppState, STATE_VARS} from '../../models/AppState';
import {ConnectionService} from '../../service/ws/connection.service';
import {IUserJoinMessage, IUserLeftMessage} from '../../interfaces/message/connection';
import {CardService} from '../../service/api/card.service';
import {Card} from '../../models/Card';
import {IGetUserPropertyAPI} from '../../interfaces/api/userProperty';
import {UserPropertyService} from '../../service/api/user-property.service';
import {BattleService} from '../../service/api/battle.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {GeolocationService} from '../../service/geolocation.service';
import {HuntService} from '../../service/api/hunt.service';
import {SpellService} from '../../service/api/spell.service';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    constructor(private router: Router,
                private userService: UserService,
                private afAuth: AngularFireAuth,
                private menu: MenuController,
                private cardService: CardService,
                private sharedDataService: SharedDataService,
                private connectionService: ConnectionService,
                private userPropertyService: UserPropertyService,
                private battleService: BattleService,
                private store: Storage,
                private auth: AuthService,
                private geolocationService: GeolocationService,
                private huntService: HuntService,
                private spellService: SpellService,
    ) {
    }

    state: AppState;
    userId: number;
    cards: Card[] = [];
    users: User[] = [];
    self: Observable<User>;
    currentUser: User;

    async ngOnInit() {
        this.sharedDataService.getStateObserver()
            .subscribe((data) => {
                this.state = data;
                this.users = data.users;
            });
    }

    async ionViewDidEnter() {
        this.afAuth.user
            .subscribe(async (user: firebase.User | null) => {
                if (!user) {
                    await this.router.navigate(['/login']);
                    return;
                }
                const token = await user.getIdToken();
                await this.store.set('token', token);
                this.self = this.userService.getUser();
                const self = await this.userService.getUser().toPromise();
                this.sharedDataService.setState(STATE_VARS.MYSELF, self);
                this.setUser(self);

                if (this.state.myself) {
                    // GPS位置情報をFirestoreへ送信
                    await this.geolocationService.saveCurrentPosition(this.state.myself.uid);
                    this.userService.getUserContacts(this.state.myself.uid)
                        .subscribe(data => {
                            this.users = data;
                            this.sharedDataService.setState(STATE_VARS.USERS, data);
                        });
                }
            });
        this.cardService.getCards()
            .subscribe(data => {
                this.cards = data;
                this.sharedDataService.setState(STATE_VARS.CARDS, data);
            });

        // TODO: replace to get only related battle
        this.battleService.getAllBattles()
            .subscribe(data => {
                this.sharedDataService.setState(STATE_VARS.BATTLES, data);
                // console.log('battles');
                // console.log(data);
            });

        // this.userService.getUsers()
        //     .subscribe(data => {
        //         this.users = data;
        //         this.sharedDataService.setState(STATE_VARS.USERS, data);
        //     });

    }

    // ログアウト処理
    async logout() {
        await this.store.remove('token');
        await this.auth.logout();
        await this.router.navigateByUrl('/login');
    }

    reload() {
        location.reload();
    }

    setUser(user: User) {
        this.currentUser = user;

        // TODO: room name
        this.connectionService
            .sendAddUser(user.id, 1, user.name, 'room1');

        this.connectionService.addUser
            .subscribe((data: IUserJoinMessage) => {
                console.log('[receive] addUser');
                console.log(data);
                const users = this.users.map((u) => {
                    if (u.id === data.userId) {
                        u.online = true;
                    }
                    return u;
                });
                this.sharedDataService.setState(STATE_VARS.USERS, users);
            });

        this.connectionService.userLeft
            .subscribe((data: IUserLeftMessage) => {
                console.log('user left');
                console.log(data);
                const users = this.users.map((u) => {
                    if (u.id === data.userId) {
                        u.online = false;
                    }
                    return u;
                });
                this.sharedDataService.setState(STATE_VARS.USERS, users);
            });

        this.userPropertyService.getUserProperties(user.id)
            .toPromise()
            .then((data: IGetUserPropertyAPI[]) => {
                this.sharedDataService.setState(STATE_VARS.PROPERTIES, data);
            });
    }

    hunt() {
        this.huntService.postHunt()
            .subscribe((data) => {
                console.log(data);

                // update properties
                this.userPropertyService.getUserProperties(this.currentUser.id)
                    .toPromise()
                    .then((data2: IGetUserPropertyAPI[]) => {
                        this.sharedDataService.setState(STATE_VARS.PROPERTIES, data2);
                    });

                this.self = this.userService.getUser();
            });
    }

    spell() {
        this.spellService.postSpellGacha()
            .subscribe((spell) => {
                console.log(spell);

                this.userPropertyService.getUserProperties(this.currentUser.id)
                    .toPromise()
                    .then((prop: IGetUserPropertyAPI[]) => {
                        this.sharedDataService.setState(STATE_VARS.PROPERTIES, prop);
                    });
            });
    }
}
