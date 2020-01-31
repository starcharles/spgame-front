import {ErrorHandler, Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {NotificationService} from './notification.service';
import {environment} from '../../environments/environment';
import HttpsError = firebase.functions.HttpsError;

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

    constructor(private shared: SharedDataService,
                private notification: NotificationService) {
    }

    handleError(e: any) {
        console.log(e);
        // const msg = `Date: ${(new Date().toISOString())} \n` +
        //     `${e.name}: ${e.message}`;

        if (!environment.production) {
            if (false) {
                if (e.message) {
                    this.notification.notifyMessage(e.message);
                    return;
                }
            }
            // this.notification.notifyMessage(e.error);
        }
    }
}
