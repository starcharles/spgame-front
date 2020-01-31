import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Storage} from '@ionic/storage';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import * as admin from 'firebase-admin';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private store: Storage,
                private afAuth: AngularFireAuth) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return fromPromise(this.handlePromise(req, next));
    }

    private async handlePromise(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const token = await this.store.get('token');
        if (token) {
            const request = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            return next.handle(request).toPromise();
        }
        return next.handle(req).toPromise();
    }
}
