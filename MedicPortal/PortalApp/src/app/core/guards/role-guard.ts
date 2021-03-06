import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { OnInit, Injectable } from '@angular/core';
import { UserService } from '@app/core/services';
import { ClaimsService } from '../services/claims.service';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {
    constructor(private claimsService: ClaimsService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const roleNames = route.data.roles;
        if (roleNames && roleNames.length > 0) {
            for (let i = 0; i < roleNames.length; i++) {
                const roleName = roleNames[i];
                if (this.claimsService.isInRole(roleName)) {
                    return true;
                }
            }
        }
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const roleNames = route.data.roles;

        if (roleNames && roleNames.length > 0) {
            for (let i = 0; i < roleNames.length; i++) {
                const roleName = roleNames[i];
                if (this.claimsService.isInRole(roleName)) {
                    return true;
                }
            }
        }
        return false;
    }
}
