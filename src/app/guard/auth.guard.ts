import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    async canActivate(next: ActivatedRouteSnapshot,
                      state: RouterStateSnapshot): Promise<boolean> {
        if (!(await this.authService.isAuthenticated())) {
            await this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
