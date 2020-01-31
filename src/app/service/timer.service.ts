import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class TimerService {

    constructor() {
    }

    interval = 100;
    count: number;
    subject: Subject<number>;
    timer: any;
    private started = false;

    startTimer(): void {
        if (this.started) {
            return;
        }
        this.count = environment.spellTimeout;
        this.subject = new Subject<number>();

        this.timer = setInterval(() => {
            this.count -= this.interval;
            if (this.count <= 0) {
                this.subject.complete();
                clearInterval(this.timer);
            }
            this.subject.next(this.count);
        }, this.interval);
        this.started = true;
    }

    stopTimer(): void {
        clearInterval(this.timer);
        this.started = false;
        this.subject.complete();
    }

    getTimerObservable(): Observable<number> {
        return this.subject.asObservable();
    }
}
