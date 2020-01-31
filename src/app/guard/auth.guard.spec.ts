import {TestBed, async, inject} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../service/auth.service';

describe('AuthGuard', () => {
    beforeEach(() => {
        const fakeAuthService = {
            authService: jasmine.createSpyObj(' authService', {
                isAuthenticated: Promise.resolve(true)
            }),
        };

        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebase),
                RouterTestingModule.withRoutes(
                    []
                    // [{path: '', component: }]
                )
            ],
            providers: [
                AngularFireAuth,
                {provide: AuthService, useValue: fakeAuthService}
            ]
        });
    });

    it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
