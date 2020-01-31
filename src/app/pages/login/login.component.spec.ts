import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {IonicModule} from '@ionic/angular';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    const authState = {
        displayName: null,
        uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
    };

    const mockAngularFireAuth: any = {
        auth: jasmine.createSpyObj('auth', {
            signInWithEmailAndPassword: Promise.reject({
                code: 'auth/operation-not-allowed'
            }),
            // 'signInWithPopup': Promise.reject(),
            // 'signOut': Promise.reject()
        }),
        authState: of(authState)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                IonicStorageModule.forRoot({
                    // name: '__testdb',
                    // driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                IonicModule.forRoot(),
                FormsModule,
                RouterTestingModule.withRoutes(
                    [{path: '', component: LoginComponent}]
                )
            ],
            declarations: [LoginComponent],
            providers: [
                { provide: AngularFireAuth, useValue: mockAngularFireAuth },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
