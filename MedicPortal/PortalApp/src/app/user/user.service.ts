import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserCredentials, Registration } from './registration';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Accept': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class UserService {
    authUrl = '/api/accounts';
    isAuthenticated = false;
    redirectUrl = '/';
    user: string;
    private loggedIn = new BehaviorSubject<boolean>(false);

    @Output()
    authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private http: HttpClient) { }
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
    private onUserLoggedIn(userToken) {
        this.isAuthenticated = true;
        this.user = userToken.user;
        localStorage.setItem('auth_token', userToken.auth_token);
        this.loggedIn.next(true);
        return userToken;
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
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
