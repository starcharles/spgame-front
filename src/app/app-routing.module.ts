import {NgModule} from '@angular/core';
import {PreloadAllModules, Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
    {path: 'popover', loadChildren: './component/popover/popover.module#PopoverPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
