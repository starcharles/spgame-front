import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../../service/shared-data.service';
import {ChatService} from '../../service/ws/chat.service';
import {User} from '../../models/User';
import {IChatMessage} from '../../interfaces/message/chat';
import {AlertController} from '@ionic/angular';
import {ChatMessage} from '../../models/ChatMessage';
import {ConnectionService} from '../../service/ws/connection.service';
import {IUserJoinMessage, IUserLeftMessage} from '../../interfaces/message/connection';
import {Router} from '@angular/router';
import {AppState} from '../../models/AppState';

@Component({
    selector: 'app-contact',
    templateUrl: 'contact.page.html',
    styleUrls: ['contact.page.scss']
})
export class ContactPage implements OnInit {

    constructor(private sharedDataService: SharedDataService,
                private router: Router,
                private chatService: ChatService) {
    }

    state: AppState;
    self?: User;
    chats: ChatMessage[] = [];
    message: string;

    ngOnInit() {
        this.sharedDataService.getStateObserver()
            .subscribe(data => {
                this.self = data.myself;
                this.chats = data.messages;
            });
    }

    async sendChatMessage() {
        if (this.self) {
            const chat: IChatMessage = {
                userId: this.self.id,
                userName: this.self.name,
                message: this.message,
                sendDate: new Date(),
            };

            this.chatService.sendChatMsg(chat);
            this.chats.push(chat);
            this.message = '';
            return;
        }

        // TODO: error
        console.log('this.self is undefined.');
    }
}
