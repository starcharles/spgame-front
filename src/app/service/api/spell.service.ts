import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellService {

  constructor(private http: HttpClient) {
  }

  private url = `${environment.base_url}/${environment.api_base}/spell/gacha`;

  postSpellGacha(): Observable<any> {
    return this.http.post<any>(this.url, null);
  }
}
