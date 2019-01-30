import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { UserService } from '@app/core/services';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.userService.isLoggedIn
            .pipe(
                take(1),
                map((isLoggedIn: boolean) => {
                    if (!isLoggedIn) {
                        this.router.navigate(['/account/login', { 'source': state.url }]);
                        return false;
                    }
                    return true;
                })
            );
    }
}