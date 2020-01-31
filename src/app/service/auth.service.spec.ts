import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {IonicStorageModule} from '@ionic/storage';

describe('AuthService', () => {
    const authState = {
        displayName: null,
        uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
    };

    const mockAngularFireAuth: any = {
        auth: jasmine.createSpyObj('auth', {
            currentUser: authState
        }),
        // authState: of(authState)
    };
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            IonicStorageModule.forRoot()
        ],
        providers: [{provide: AngularFireAuth, useValue: mockAngularFireAuth}]
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
