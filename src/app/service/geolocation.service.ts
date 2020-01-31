import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as geofirex from 'geofirex';

const {Geolocation} = Plugins;
const geo = geofirex.init(firebase);

export interface GeoPoint {
    geohash: string;
    geopoint: firebase.firestore.GeoPoint;
}

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {
    // private geoDocument: AngularFirestoreDocument<any>;
    private geoCollection: AngularFirestoreCollection<GeoPoint>;

    constructor(private afs: AngularFirestore) {
        this.geoCollection = afs.collection<GeoPoint>('geopoints');
    }

    async saveCurrentPosition(uid: string) {
        const coords = await this.getCurrentPosition();
        const position = geo.point(coords.coords.latitude, coords.coords.longitude);
        // await this.geoCollection.doc(uid).set({
        //     geohash: position.geohash,
        //     geopoint: position.geopoint,
        // } as GeoPoint);
        await this.geoCollection.doc(uid).set({
            position,
        });
    }

    private async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);
        return coordinates;
    }


    watchPosition() {
        const wait = Geolocation.watchPosition({}, (position, err) => {
        });
    }
}
