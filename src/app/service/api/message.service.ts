import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChatMessage} from '../../models/ChatMessage';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient) {
    }

    private messagesUrl = `${environment.base_url}/${environment.api_base}/messages`;

    public getMessages(): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(this.messagesUrl);
    }

    public validateMessage(message: string): boolean {
        if (message === '') {
            return false;
        }
        return true;
    }
}
