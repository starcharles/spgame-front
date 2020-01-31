import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    private url = `${environment.base_url}/${environment.api_base}/users`;
    private url1 = `${environment.base_url}/${environment.api_base}/user`;
    private url2 = `${environment.base_url}/${environment.api_base}/user/new`;

    public getUserContacts(uid: string): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}/${uid}/contacts` );
    }

    // public getUsers(): Observable<User[]> {
    //     return this.http.get<User[]>(this.url);
    // }

    public getUser(): Observable<User> {
        return this.http.get<User>(this.url1);
    }

    public postUser(token: string, body: any): Observable<any> {
        return this.http.post(`${this.url2}`, body);
    }
}

