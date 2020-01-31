import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../models/Room';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(private http: HttpClient) {
    }

    private url = `${environment.base_url}/${environment.api_base}/rooms`;

    public getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.url);
    }
}
