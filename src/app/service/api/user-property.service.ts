import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserProperty} from '../../models/UserProperty';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserPropertyService {
    constructor(private http: HttpClient) {
    }

    private url = `${environment.base_url}/${environment.api_base}/properties`;

    public getUserProperties(userId: number): Observable<UserProperty[]> {
        return this.http.get<UserProperty[]>(this.url + '/' + userId);
    }
}
