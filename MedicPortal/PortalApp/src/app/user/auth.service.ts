import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserCredentials, Registration } from './registration';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Accept': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = "https://localhost:44342/api/accounts";
    isAuthenticated = false;
    redirectUrl = "/";
    user:string;

    @Output()
    authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private http: HttpClient) { }
    register(registration: Registration): Observable<any> {
        return this.http.post<any>(this.authUrl + '/register', registration)
            .pipe(
                map(loggedIn => {
                    this.isAuthenticated = true;
                    this.user= loggedIn.user;
                    this.userAuthChanged(true);
                    return loggedIn;
                }),
                catchError(this.handleError)
            );
    }
    login(credentials: UserCredentials): Observable<any> {
        return this.http.post<any>(this.authUrl + '/login', credentials)
            .pipe(
                map(result => {
                    this.isAuthenticated = true;
                    this.user= result.user;
                    localStorage.setItem('auth_token', result.auth_token);
                    this.userAuthChanged(true);
                    return result;
                }),
                catchError(this.handleError)
            );
    }
    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status); // Raise changed event
    }
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Server error');
    }
}
