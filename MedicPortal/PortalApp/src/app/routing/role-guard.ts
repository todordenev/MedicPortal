import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';
import { OnInit, Injectable } from '@angular/core';

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
