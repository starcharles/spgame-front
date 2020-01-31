import {TestBed} from '@angular/core/testing';

import {HttpInterceptorService} from './http-interceptor.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './api/user.service';
import {IonicStorageModule} from '@ionic/storage';
import {AngularFireAuth} from '@angular/fire/auth';

describe('HttpInterceptorService', () => {
    const mockAngularFireAuth: any = {
        auth: jasmine.createSpyObj('auth', {
            currentUser: {
                uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
            }
        }),
    };

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            IonicStorageModule.forRoot()
        ],
        providers: [{provide: AngularFireAuth, useValue: mockAngularFireAuth}],
    }));

    it('should be created', () => {
        const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
        expect(service).toBeTruthy();
    });

    it('should attach header', () => {
        const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
        const userService = TestBed.get(UserService);
        userService.postUser('aaa', {});
        expect(service).toBeTruthy();
    });
    it('should attach proper authorization token', () => {
        const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
    });
});
