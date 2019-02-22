import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  user: User;
  constructor(private userService: UserService) {
    userService.user.subscribe(user => this.user = user);
  }

  isInRole(roleName: string): boolean {
    try {
      const userRoles = this.user.roles;
      if (userRoles && userRoles.length > 0) {
        for (let i = 0; i < userRoles.length; i++) {
          const role = userRoles[i];
          if (role === roleName) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  isInOneRole(roles: string[]): boolean {
    for (let i = 0; i < roles.length; i++) {
      if (this.isInRole(roles[i])) {
        return true;
      }
    }
    return false;
  }

  hasClaim(type: string, value: string) {
    const userClaims = this.user.claims;
    for (let i = 0; i < userClaims.length; i++) {
      const claim = userClaims[i];
      if (claim.type === type && claim.value === value) {
        return true;
      }
    }
    return false;
  }
}
