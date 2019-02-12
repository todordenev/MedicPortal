import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { authTokenNameConst } from '@app/core/constants';
import { User } from '@app/core/entities/user';
import { UserCredentials, Registration } from '@app/core/entities/registration';
import { handleError } from '../entities/helpers';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {

    authUrl = '/api/accounts';
    _user: BehaviorSubject<User>;
    _loggedIn = new BehaviorSubject<boolean>(false);
    _loadingUserInfo = new BehaviorSubject<boolean>(true);
    constructor(private http: HttpClient) {
        this.ngOnInit();
    }
    ngOnInit(): void {
        this._loadingUserInfo.next(true);
        const userJson = localStorage.getItem(authTokenNameConst);
        if (userJson && userJson !== 'undefined') {
            const cachedUser = JSON.parse(userJson);
            this._user = new BehaviorSubject<User>(cachedUser as User);
            this._loggedIn.next(true);
        } else {
            this._user = new BehaviorSubject<User>(new User());
            this._loadingUserInfo.next(false);
        }
        this.getUserInfo();
    }

    get isLoggedIn() {
        return this._loggedIn.asObservable();
    }
    get user(): Observable<User> {
        return this._user.asObservable();
    }
    get isLoading() {
        return this._loggedIn.asObservable();
    }

    isInRole(roleName: string): boolean {
        try {
            const userRoles = this._user.value.roles;
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
        const userClaims = this._user.value.claims;
        for (let i = 0; i < userClaims.length; i++) {
            const claim = userClaims[i];
            if (claim.type === type && claim.value === value) {
                return true;
            }
        }
        return false;
    }
    register(registration: Registration): Observable<any> {
        return this.http.post(this.authUrl + '/register', registration)
            .pipe(
                map(() => { this.getUserInfo(); }),
                catchError(handleError)
            );
    }
    login(credentials: UserCredentials): Observable<any> {
        return this.http.post(this.authUrl + '/login', credentials)
            .pipe(
                map(() => { this.getUserInfo(); }),
                catchError(handleError)
            );
    }
    getUserInfo() {
        this.http.get(this.authUrl + '/getuserinfo')
            .subscribe(
                result => {
                    this.onUserLoggedIn(result);
                },
                error => {
                    if (error.status === 401) {
                        this._loggedIn.next(false);
                        this._user.next(new User());
                    }
                },
                () => { this._loadingUserInfo.next(false); }
            );
    }


    private onUserLoggedIn(user) {
        const userString = JSON.stringify(user);
        localStorage.setItem(authTokenNameConst, userString);
        this._user.next(user as User);
        this._loggedIn.next(true);
        this._loadingUserInfo.next(false);
    }

    logout() {
        localStorage.removeItem(authTokenNameConst);
        this._loggedIn.next(false);
        return this.http.post(this.authUrl + '/logout', {})
            .pipe(
                map(() => { }),
                catchError(handleError)
            );
    }
    getAvatarImage(): any {
        return this.http.get(this.authUrl + '/avatar-image')
            .pipe(
                map((result) => {  }),
                catchError(handleError)
            );
    }


}
