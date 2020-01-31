import {TestBed} from '@angular/core/testing';

import {TimerService} from './timer.service';
import {environment} from '../../environments/environment';

describe('TimerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    let count1: number;
    it('should be created', () => {
        const service: TimerService = TestBed.get(TimerService);
        expect(service).toBeTruthy();
    });
    it('should decrease timer count', () => {
        const service: TimerService = TestBed.get(TimerService);
        service.startTimer();
        setTimeout(() => {
            count1 = service.count;
            console.log(11);
            expect(count1).toBeLessThan(environment.spellTimeout);
        }, 500);
    });
    it('should decrease timer count', () => {
        const service: TimerService = TestBed.get(TimerService);
        service.startTimer();
        setTimeout(() => {
            console.log(11);
            expect(service.count).toBeLessThan(count1);
        }, 1000);
    });
    it('should decrease timer count', () => {
        const service: TimerService = TestBed.get(TimerService);
        service.startTimer();
        const obs = service.getTimerObservable();
        expect(obs).toBeDefined();
        obs.subscribe((count) => {
            expect(count).toBeLessThan(environment.spellTimeout);
        });
    });
});
