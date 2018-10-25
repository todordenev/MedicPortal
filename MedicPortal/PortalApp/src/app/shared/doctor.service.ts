import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from '../doctor/Doctor';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { AuthHttpClientService } from './auth-http-client.service';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    endpointUrl = '/api/doctors';
    doctors: Doctor[] = [];

    constructor(private http: AuthHttpClientService, private userService: UserService) { }

    getDoctors(): Observable<Doctor[]> {
        if (this.doctors.length > 0) {
            return of(this.doctors);
        }
        return this.http.get(this.endpointUrl)
            .pipe(
                map(serverResult => this.setDoctors(serverResult)),
                catchError(this.handleError)
            );
    }

    setDoctors(serverResult) {
        if (serverResult instanceof Array) {
            serverResult.forEach(element => {
                const doc = new Doctor(element);
                this.doctors.push(doc);
            });
        }

        return this.doctors;
    }

    getDoctor(id: string): Observable<Doctor> {
        const url = this.endpointUrl + '/' + id;
        return this.http.get(url)
            .pipe(
                map(doctor => this.mapDoctorFromServer(doctor)),
                catchError(this.handleError)
            );
    }

    mapDoctorFromServer(serverResult) {
        const doc = new Doctor(serverResult);
        this.doctors.push(doc);
        return doc;
    }

    clearCachedDoctors() {
        this.doctors = [];
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
