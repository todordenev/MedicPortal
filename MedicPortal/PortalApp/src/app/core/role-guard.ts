import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnInit, Injectable } from '@angular/core';
import { UserService } from '@app/core/services';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private userService: UserService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const roleName = route.data.role;
        if (roleName) {
            return this.userService.hasRole(roleName);
        }
        return true;
    }

}
