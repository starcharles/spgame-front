import {Injectable} from '@angular/core';
import {SocketIoService} from './socketio.service';
import {Observable, Subject} from 'rxjs/index';
import {IChatMessage} from '../../interfaces/message/chat';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    messages: Subject<any>;

    constructor(private sioService: SocketIoService) {
        this.messages = sioService.messages();
    }

    sendChatMsg(msg: IChatMessage) {
        this.messages.next(msg);
    }
}
