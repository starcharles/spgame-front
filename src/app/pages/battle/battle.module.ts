import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {BattlePage} from './battle.page';
import {BattleHistoryPage} from './battle-history/battle-history.page';

const routes: Routes = [
    {
        path: '',
        component: BattlePage
    },
    {
        path: 'history',
        loadChildren: './battle-history/battle-history.module#BattleHistoryPageModule'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [BattlePage]
})
export class BattlePageModule {
}
