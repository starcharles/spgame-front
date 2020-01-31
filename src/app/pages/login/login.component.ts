import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../service/auth.service';
import {SocketIoService} from '../../service/ws/socketio.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    login: {
        email: string;
        password: string;
    } = {
        email: '',
        password: ''
    };

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private auth: AuthService) {
    }

    async ngOnInit() {
        // const token = await this.auth.getIdTokenAndSetStorage();
        // if (token) {
        //     await this.router.navigate(['/tabs/home']);
        // }
    }

    async userLogin() {
        this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password)
            .then(async (user) => {
                if (user.user) {
                    // const token = await user.user.getIdToken();
                    await this.auth.setToken(user.user);
                    await this.router.navigate(['/tabs/home']);
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    }
}
