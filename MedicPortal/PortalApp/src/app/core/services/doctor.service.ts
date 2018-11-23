import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from '@app/core/entities';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { handleError } from '../entities/helpers';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    docotrEndpointUrl = '/api/doctors';
    constructor(private http: HttpClient) { }

    getDoctors(): Observable<Doctor[]> {
        return this.http.get(this.docotrEndpointUrl)
            .pipe(
                map(serverResult => this.toDoctors(serverResult)),
                catchError(handleError)
            );
    }

    getMyDoctors(): Observable<Doctor[]> {
        return this.http.get(this.docotrEndpointUrl + '/foraccount')
            .pipe(
                map(serverResult => this.toDoctors(serverResult)),
                catchError(handleError)
            );
    }

    toDoctors(serverResult) {
        const doctorsArray: Doctor[] = [];
        if (serverResult) {
            serverResult.forEach(element => {
                const doc = new Doctor(element);
                doctorsArray.push(doc);
            });
        }
        return doctorsArray;
    }

    getDoctor(id: string): Observable<Doctor> {
        const url = this.docotrEndpointUrl + '/' + id;
        return this.http.get(url)
            .pipe(
                map(doctor => new Doctor(doctor)),
                catchError(handleError)
            );
    }

    clearCachedDoctors() {
        throw new Error();
    }
}
