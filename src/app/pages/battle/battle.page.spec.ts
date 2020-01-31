import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BattlePage} from './battle.page';
import {ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, from} from 'rxjs';
import {TimerService} from '../../service/timer.service';
import {AppState} from '../../models/AppState';
import {User} from '../../models/User';
import {Card} from '../../models/Card';
import {IGetUserPropertyAPI} from '../../interfaces/api/userProperty';
import {ChatMessage} from '../../models/ChatMessage';
import {Battle} from '../../models/Battle';

xdescribe('BattlePage', () => {
    let component: BattlePage;
    let fixture: ComponentFixture<BattlePage>;
    // const fakeActivatedRoute = {
    //     snapshot: {
    //         queryParamMap: convertToParamMap({player: 'aaa'}),
    //     }
    // };



    const fakeTimerService = {
        getTimerObservable: () => of(1000, 999, 997),
    };

    beforeEach(async(() => {
        const queryParams = {player: 'attacker'};

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            providers: [
                { provide: ActivatedRouteSnapshot, useValue: { queryParamMap: { get: () => queryParams.player}}},
                {provide: TimerService, useValue: fakeTimerService}
            ],
            declarations: [BattlePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BattlePage);
        component = fixture.componentInstance;

        component.state = {
            users: [] as User[],
            cards: [] as Card[],
            properties: []as IGetUserPropertyAPI[],
            messages: [] as ChatMessage[],
            battles: [] as Battle[],
            errors: [] as any[]
        };
        // component = {
        //     battleId: 2,
        //
        //
        // }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
