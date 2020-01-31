import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {BattleHistoryPage} from './battle-history.page';

const routes: Routes = [
    {
        path: '',
        component: BattleHistoryPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [BattleHistoryPage],
})
export class BattleHistoryPageModule {
}
