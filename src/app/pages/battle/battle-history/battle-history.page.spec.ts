import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BattleHistoryPage} from './battle-history.page';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('BattleHistoryPage', () => {
    let component: BattleHistoryPage;
    let fixture: ComponentFixture<BattleHistoryPage>;

    const fakeActivatedRoute = {
        snapshot: {
            data: {
                battleId: 1
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [{
                provide: ActivatedRoute, useValue: fakeActivatedRoute
            }],
            declarations: [BattleHistoryPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BattleHistoryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
