import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';
import { OnInit, Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private userService: UserService) { }
    canActivate() {
        console.log('AlwaysActivateGuard');
        return this.userService.isAuthenticated;
    }
}
