import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs/index';
import {fromEvent} from 'rxjs';
import {EVENTS} from '../../interfaces/events';

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
    private socket: any;

    constructor() {
    }

    connect(): Observable<MessageEvent> {
        this.socket = io(environment.ws_url);
        return this.getObservable(EVENTS.CLIENT.CONNECT);
    }

    disconnect(): Observable<MessageEvent> {
        return this.getObservable(EVENTS.CLIENT.DISCONNECT);
    }

    userLeft(): Observable<MessageEvent> {
        return this.getObservable(EVENTS.CLIENT.USER_LEFT);
    }

    spellResponse(): Subject<MessageEvent> {
        const observable = this.getObservable(EVENTS.CLIENT.SPELL_RESULT);

        const observer = {
            next: (data: object) => {
                this.socket.emit(EVENTS.SERVER.SPELL_RESPONSE, data);
            },
        };

        return Subject.create(observer, observable);
    }

    spellStart(): Subject<MessageEvent> {
        const observable = fromEvent<MessageEvent>(this.socket, EVENTS.CLIENT.SPELL_ATTACKED);

        const observer = {
            next: (data: object) => {
                this.socket.emit(EVENTS.SERVER.SPELL_START, data);
            },
        };

        return Subject.create(observer, observable);
    }

    messages(): Subject<MessageEvent> {
        const observable = this.getObservable(EVENTS.SERVER.NEW_MESSAGE);

        const observer = {
            next: (data: object) => {
                this.socket.emit(EVENTS.SERVER.NEW_MESSAGE, data);
            },
        };

        return Subject.create(observer, observable);
    }

    addUser(): Subject<MessageEvent> {
        const observable = fromEvent<MessageEvent>(this.socket, EVENTS.CLIENT.USER_JOIN);

        const observer = {
            next: (data: object) => {
                this.socket.emit(EVENTS.SERVER.ADD_USER, data);
            },
        };
        return Subject.create(observer, observable);

    }

    myError() {
        return this.getObservable('my-error');
    }

    private getObservable(eventName: string): Observable<MessageEvent> {
        return fromEvent<MessageEvent>(this.socket, eventName);
    }

}

