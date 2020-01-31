import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

declare let gtag: any; // グローバル変数gtagを解決

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor() {
    }

    private useGA(): boolean {
        return typeof gtag !== undefined;
    }

    sendPageView(url: string): void {
        if (!this.useGA()) {
            return;
        }
        gtag('config', environment.ga_id, {
            'page-path': url
        });
    }

    sendEvent(eventName: string,
              eventCategory: string,
              eventAction: string,
              eventLabel: any): void {
        if (!this.useGA()) {
            return;
        }
        gtag('event', eventName, {
            event_category: eventCategory,
            event_action: eventAction,
            event_label: eventLabel
        });
    }
}
