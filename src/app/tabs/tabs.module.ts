import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {ContactPageModule} from '../pages/contact/contact.module';
import {HomePageModule} from '../pages/home/home.module';
import {BookPageModule} from '../pages/book/book.module';
import {PlayerPageModule} from '../pages/player/player.module';
import {ItemPageModule} from '../pages/item/item.module';
import {BattlePageModule} from '../pages/battle/battle.module';
import {LogPageModule} from '../pages/log/log.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        HomePageModule,
        BookPageModule,
        PlayerPageModule,
        ItemPageModule,
        ContactPageModule,
        BattlePageModule,
        LogPageModule,
    ],
    declarations: [TabsPage],
})
export class TabsPageModule {
}
