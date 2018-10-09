import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Doctor } from "./Doctor";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


const DOCTORS: Doctor[] = [
    {
        name: "Irina Ivanova", id: 1, worktimes: [
            { id: 1, dayOfWeek: 0, from: 8.00, till: 12.00 },
            { id: 2, dayOfWeek: 1, from: 9.00, till: 12.00 },
            { id: 3, dayOfWeek: 2, from: 9.5, till: 12.00 },
            { id: 4, dayOfWeek: 3, from: 10, till: 12.00 },
            { id: 5, dayOfWeek: 4, from: 11, till: 12.00 }
        ]
    },
    {
        name: "Hristo Hristov", id: 2, worktimes: [
            { id: 1, dayOfWeek: 0, from: 8.00, till: 12.00 },
            { id: 2, dayOfWeek: 1, from: 9.00, till: 12.00 },
            { id: 3, dayOfWeek: 2, from: 9.5, till: 12.00 },
            { id: 4, dayOfWeek: 3, from: 10, till: 12.00 },
            { id: 5, dayOfWeek: 4, from: 11, till: 12.00 }
        ]
    }
];

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    authUrl = "https://localhost:44342/api/doctors";

    constructor(private http: HttpClient) { }

    getDoctors(): Observable<Doctor[]> {
        return of(DOCTORS);
    }

    getDoctor(id: number): Observable<any> {

        let authToken = localStorage.getItem('auth_token');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            })
        };
        return this.http.get(this.authUrl, httpOptions)
            .pipe(
                map(loggedIn => {
                    return loggedIn;
                }),
                catchError(this.handleError)
            );
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
