import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Battle} from '../../models/Battle';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BattleService {

    constructor(private http: HttpClient) {
    }

    private url = `${environment.base_url}/${environment.api_base}/battles`;

    public getBattlesByUserId(userId: number): Observable<Battle[]> {
        return this.http.get<Battle[]>(this.url + `/${userId}`);
    }

    public getAllBattles(): Observable<Battle[]> {
        return this.http.get<Battle[]>(this.url);
    }
}
