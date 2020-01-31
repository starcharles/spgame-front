import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

import {User} from '../../models/User';
import {PocketType, UserProperty} from '../../models/UserProperty';
import {SharedDataService} from '../../service/shared-data.service';
import {IGetUserPropertyAPI} from '../../interfaces/api/userProperty';

@Component({
    selector: 'app-book',
    templateUrl: './book.page.html',
    styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit, OnDestroy {

    constructor(private router: Router,
                private sharedDataService: SharedDataService) {
    }

    card = 'spell';
    self?: User;
    properties: IGetUserPropertyAPI[];
    subs: any;

    ngOnInit() {
        this.subs = this.sharedDataService.getStateObserver()
            .subscribe(data => {
                this.self = data.myself;
                this.properties = data.properties;
            });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    segmentChanged(ev: any) {
        this.card = ev.detail.value;
    }

    isSpell(property: UserProperty) {
        return property.pocketType === PocketType.Spell;
    }

    isNormal(property: UserProperty) {
        return property.pocketType === PocketType.Normal;
    }

    isItem(property: UserProperty) {
        return property.pocketType === PocketType.Item;
    }

    isSpecial(property: UserProperty) {
        return property.pocketType === PocketType.Special;
    }

}
