import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Storage} from '@ionic/storage';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth,
                private store: Storage) {
    }

    public async isAuthenticated() {
        const token = await this.store.get('token');
        if (!token) {
            return false;
        }
        return true;
    }

    async setToken(currentUser: firebase.User): Promise<string> {
        const token = await currentUser.getIdToken();
        await this.store.set('token', token);
        return token;
    }

    async logout() {
        await this.afAuth.auth.signOut();
    }
}
