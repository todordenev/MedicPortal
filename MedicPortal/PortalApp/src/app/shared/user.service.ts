import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserCredentials, Registration } from '../user/registration';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../user/user';
import { AuthHttpClientService } from './auth-http-client.service';
import { authTokenNameConst } from './constants';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {
    authUrl = '/api/accounts';
    private loggedIn = new BehaviorSubject<boolean>(false);
    private authToken: string;
    private _user: User;
    get getUserName(): string {
        return 'Todor';
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    get user() {
        return this._user;
    }
    get AuthToken(): string {
        return this.authToken;
    }
    private setAuthToken(value: string) {
        this.authToken = value;
        if (value) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(value);
            this._user = new User(decodedToken);
            localStorage.setItem(authTokenNameConst, value);
        } else {
            this._user = null;
            localStorage.removeItem(authTokenNameConst);
        }
    }

    constructor(private http: AuthHttpClientService) {
        this.ngOnInit();
    }
    ngOnInit(): void {
        const authToken = localStorage.getItem(authTokenNameConst);
        if (this.isTokenValid(authToken)) {
            this.loggedIn.next(true);
            this.setAuthToken(authToken);
        } else {
            if (authToken) {
                this.setAuthToken(null);
            }
        }
    }
    private isTokenValid(jwt): boolean {
        if (jwt) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(jwt);
            return !isExpired;
        }
        return false;
    }
    hasRole(roleName: string) {
        try {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(this.authToken);
            return true;
        } catch (error) {
            return false;
        }
    }

    register(registration: Registration): Observable<any> {
        return this.http.post(this.authUrl + '/register', registration)
            .pipe(
                map(result => { this.onUserLoggedIn(result); }),
                catchError(this.handleError)
            );
    }
    login(credentials: UserCredentials): Observable<any> {
        return this.http.post(this.authUrl + '/login', credentials)
            .pipe(
                map(result => { this.onUserLoggedIn(result); }),
                catchError(this.handleError)
            );
    }
    logout() {
        return this.http.post(this.authUrl + '/logout')
            .pipe(
                map(result => { this.onUserLoggedOut(); }),
                catchError(this.handleError)
            );
    }
    private onUserLoggedOut() {
        this.setAuthToken(null);
        this.loggedIn.next(false);

    }
    private onUserLoggedIn(userToken) {
        this.setAuthToken(userToken.auth_token);
        this.loggedIn.next(true);
    }
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Server error');
    }
}
