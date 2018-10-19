import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserCredentials, Registration } from './registration';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {
    authUrl = '/api/accounts';
    private loggedIn = new BehaviorSubject<boolean>(false);
    private auth_token: string;
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    user: string;

    constructor(private http: HttpClient) {
        this.ngOnInit();
    }
    ngOnInit(): void {
        this.auth_token = localStorage.getItem('auth_token');
        if (this.isTokenValid()) {
            this.loggedIn.next(true);
        }
    }
    private isTokenValid(): boolean {
        try {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(this.auth_token);
            const isExpired = helper.isTokenExpired(this.auth_token);
            
            return !isExpired;
        } catch (error) {
            return false;
        }
    }
    register(registration: Registration): Observable<any> {
        return this.http.post<any>(this.authUrl + '/register', registration)
            .pipe(
                map(result => { this.onUserLoggedIn(result); }),
                catchError(this.handleError)
            );
    }
    login(credentials: UserCredentials): Observable<any> {
        return this.http.post<any>(this.authUrl + '/login', credentials)
            .pipe(
                map(result => { this.onUserLoggedIn(result); }),
                catchError(this.handleError)
            );
    }
    logout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth_token}`
            })
        };
        return this.http.post(this.authUrl + '/logout', null, httpOptions)
            .pipe(
                map(result => { this.loggedIn.next(false); }),
                catchError(this.handleError)
            );
    }
    private onUserLoggedIn(userToken) {
        this.user = userToken.user;
        localStorage.setItem('auth_token', userToken.auth_token);
        this.loggedIn.next(true);
        return userToken;
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
