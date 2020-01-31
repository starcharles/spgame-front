import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from '../../service/api/user.service';
import {User} from '../../models/User';
import {SharedDataService} from '../../service/shared-data.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-player',
    templateUrl: './player.page.html',
    styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

    constructor(private userService: UserService,
                private router: Router,
                private sharedDataService: SharedDataService) {
    }

    users: User[] = [];

    ngOnInit() {
        this.sharedDataService.getStateObserver()
            .subscribe(data => {
                this.users = data.users;
            });
    }

    // ngDoCheck() {
    //     this.users = this.sharedDataService.getState().users;
    // }
}
