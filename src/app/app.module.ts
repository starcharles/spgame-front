import {ErrorHandler, Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicStorageModule} from '@ionic/storage';
import {RouteReuseStrategy} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';

// Firebaseを利用するためのモジュール
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './pages/register/register.component';
import {PopoverPageModule} from './component/popover/popover.module';
import {ErrorHandlerService} from './service/error-handler.service';
import {environment} from '../environments/environment';
import {HttpInterceptorService} from './service/http-interceptor.service';
import {AngularFirestore} from "@angular/fire/firestore";


// enable gesture (tap, swipe, etc...) in Ionic
@Injectable()
export class IonicGestureConfig extends HammerGestureConfig {
    buildHammer(element: HTMLElement) {
        const mc = new (window as any).Hammer(element);
        for (const eventName of Object.keys(this.overrides)) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        PopoverPageModule,
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ],
    providers: [
        AngularFirestore,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}

