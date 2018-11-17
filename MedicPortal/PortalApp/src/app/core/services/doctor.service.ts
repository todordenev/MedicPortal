import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from '@app/core/entities';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    docotrEndpointUrl = '/api/doctors';
    doctors: Doctor[] = [];
    myDoctors: Doctor[] = [];

    constructor(private http: HttpClient) { }

    getDoctors(): Observable<Doctor[]> {
        if (this.doctors.length > 0) {
            return of(this.doctors);
        }
        return this.http.get(this.docotrEndpointUrl)
            .pipe(
                map(serverResult => this.setDoctors(this.doctors, serverResult)),
                catchError(this.handleError)
            );
    }

    getMyDoctors(): Observable<Doctor[]> {
        if (this.myDoctors.length > 0) {
            return of(this.myDoctors);
        }
        return this.http.get(this.docotrEndpointUrl + '/foraccount')
            .pipe(
                map(serverResult => this.setDoctors(this.myDoctors, serverResult)),
                catchError(this.handleError)
            );
    }

    setDoctors(doctorsArray, serverResult) {
        if (serverResult) {
            serverResult.forEach(element => {
                const doc = new Doctor(element);
                doctorsArray.push(doc);
            });
        }
        return doctorsArray;
    }

    getDoctor(id: string): Observable<Doctor> {
        if (this.doctors.length > 0) {
            return of(this.doctors.find(x => x.id === id));
        }

        const url = this.docotrEndpointUrl + '/' + id;
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
