import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Card} from '../../models/Card';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    constructor(private http: HttpClient) {
    }

    private getCardsUrl = `${environment.base_url}/${environment.api_base}/cards`;
    private getCardUrl = `${environment.base_url}/${environment.api_base}/card`;
    private postCardUrl = `${environment.base_url}/${environment.api_base}/card`;

    public getCards(): Observable<Card[]> {
        return this.http.get<Card[]>(this.getCardsUrl);
    }
    public getCard(cardNo: number): Observable<Card> {
        return this.http.get<Card>(this.getCardUrl + '/' + cardNo);

    }

    public postCard(cardNo: number, option: any): Observable<Card> {
        return this.http.post<Card>(this.postCardUrl + '/' + cardNo, option);
    }
}
