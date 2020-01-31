import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {SocketIoService} from './socketio.service';
import {IAddUserMessage} from '../../interfaces/message/connection';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {

    userLeft: Observable<any>;
    disconnect: Observable<any>;
    addUser: Subject<any>;

    constructor(private sioService: SocketIoService) {
        this.addUser = sioService.addUser();
        this.userLeft = sioService.userLeft();
        this.disconnect = sioService.disconnect();
    }

    sendAddUser(userId: number, roomId: number, userName: string, roomName: string) {
        const data: IAddUserMessage = {
            userId,
            roomId,
            userName,
            roomName,
        };

        console.log('client: add_user');
        console.log(data);
        this.addUser.next(data);
    }
}
