import * as functions from 'firebase-functions';
import * as geofirex from "geofirex";
import * as request from "request-promise-native";
// tslint:disable-next-line:no-duplicate-imports
import {get} from 'geofirex';

const admin = require('firebase-admin');
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

export const onWriteGeopoint = functions.firestore.document('geopoints/{userId}')
    .onWrite((async (change, context) => {
        console.log("aaaaaa");
        const geo = geofirex.init(admin);
        const firestore = admin.firestore();

        const userId = context.params.userId;
        console.log(context.params.userId);
        console.log(context.params);

        const data = change.after.data() as any;
        console.log(data);
        // console.log(geopoint);
        const geopoint = data.position.geopoint;

        // query
        const center = geo.point(geopoint._latitude, geopoint._longitude);
        console.log(center);
        const radius = 1;
        const field = 'position';
        const geopoints = firestore.collection('geopoints');
        console.log(geopoints);

        const query = geo.query(geopoints).within(center, radius, field);
        console.log(query);
        const hits = await get(query);
        console.log(hits);

        // send users
        const res = await request({
            method: 'POST',
            uri: `${functions.config().api.api_url}/users/${userId}/contact`,
            body: {
                users: hits,
            },
            json: true // Automatically stringifies the body to JSON
        });
        console.log(res);

    }));
