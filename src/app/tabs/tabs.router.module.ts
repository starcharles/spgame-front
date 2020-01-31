import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'book',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/book/book.module#BookPageModule'
                    },
                ]
            },
            {
                path: 'player',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/player/player.module#PlayerPageModule'
                    }
                ]
            },
            // {
            //     path: 'item',
            //     children: [
            //         {
            //             path: '',
            //             loadChildren: '../pages/item/item.module#ItemPageModule'
            //         }
            //     ]
            // },
            {
                path: 'contact',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/contact/contact.module#ContactPageModule'
                    }
                ]
            },
            {
                path: 'battle',
                children: [
                    {
                        path: ':battleId',
                        loadChildren: '../pages/battle/battle.module#BattlePageModule'
                    },
                ]
            },
            {
                path: 'log',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/log/log.module#LogPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
