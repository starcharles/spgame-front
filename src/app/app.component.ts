import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SocketIoService} from './service/ws/socketio.service';
import {AnalyticsService} from './service/analytics.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private sioService: SocketIoService,
                private analytics: AnalyticsService,
                private router: Router) {
        this.initializeApp();
    }

    ngOnInit() {
        // Google Analytics tracking
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((params: any) => {
                this.analytics.sendPageView(params.url);
            });

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.sioService.connect();
        });
    }
}
