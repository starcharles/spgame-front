import {CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {PopoverPageModule} from '../../component/popover/popover.module';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {By} from 'protractor';

fdescribe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    const mockAngularAuth = {};
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                FormsModule,
                RouterTestingModule,
                HttpClientModule,
                IonicStorageModule.forRoot({
                    name: '__testdb',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireAuthModule,
                PopoverPageModule,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
