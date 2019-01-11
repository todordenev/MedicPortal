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
        const roleNames = route.data.roles;
        if (roleNames && roleNames.length > 0) {
            for (let i = 0; i < roleNames.length; i++) {
                const roleName = roleNames[i];
                if (this.userService.hasRole(roleName)) {
                    return true;
                }
            }
        }
        return false;
    }

}
