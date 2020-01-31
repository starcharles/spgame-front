import {Injectable} from '@angular/core';
import {AppState, STATE_VARS} from '../models/AppState';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable({
    providedIn: 'root',
})
export class SharedDataService {
    constructor() {}

    private appStateSubject = new BehaviorSubject<AppState>({
        myself: undefined,
        users: [],
        cards: [],
        properties: [],
        messages: [],
        battles: [],
        errors: [],
    });

    public getStateObserver(): Observable<AppState> {
        return this.appStateSubject.asObservable();
    }

    public setState(stateVar: STATE_VARS, newData: any): void {
        const state = this.appStateSubject.getValue();
        state[stateVar] = newData;
        this.appStateSubject.next(state);
    }
}
