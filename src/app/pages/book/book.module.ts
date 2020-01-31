import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {BookPage} from './book.page';

const routes: Routes = [
        {
            path: '',
            component: BookPage,
        },
        {
            path: ':cardNo',
            loadChildren: './card-detail/card-detail.module#CardDetailPageModule'
        }
    ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [BookPage],
})
export class BookPageModule {
}
