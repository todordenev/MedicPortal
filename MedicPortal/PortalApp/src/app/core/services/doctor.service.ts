import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from '@app/core/entities';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { handleError, GetWorkdays } from '../entities/helpers';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    doctorEndpointUrl = '/api/doctors';
    doctors: Doctor[] = [];
    myDoctors: Doctor[] = [];
    constructor(private http: HttpClient) { }
    getDoctors(): Observable<Doctor[]> {
        if (this.doctors.length > 0) {
            of(this.doctors);
        }
        return this.http.get(this.doctorEndpointUrl)
            .pipe(
                map(serverResult => this.mapToDoctors(serverResult)),
                catchError(handleError)
            );
    }

    getMyDoctors(): Observable<Doctor[]> {
        if (this.myDoctors.length > 0) {
            of(this.myDoctors);
        }
        return this.http.get(this.doctorEndpointUrl + '/mydoctors')
            .pipe(
                map(serverResult => this.mapToMyDoctors(serverResult)),
                catchError(handleError)
            );
    }

    mapToDoctors(serverResult) {
        this.doctors = this.toDoctors(serverResult);
        return this.doctors;
    }

    mapToMyDoctors(serverResult) {
        this.myDoctors = this.toDoctors(serverResult);
        return this.myDoctors;
    }

    toDoctors(serverResult) {
        const doctorsArray: Doctor[] = [];
        if (serverResult) {
            serverResult.forEach(d => {
                doctorsArray.push(this.mapToDoctor(d));
            });
        }
        return doctorsArray;
    }

    getDoctor(id: string): Observable<Doctor> {
        const doctor = this.doctors.find(d => d.id === id);
        if (doctor) {
            return of(doctor);
        } else {
            const url = this.doctorEndpointUrl + '/' + id;
            return this.http.get(url)
                .pipe(
                    map(d => this.mapToDoctor(d)),
                    catchError(handleError)
                );
        }
    }

    mapToDoctor(serverObject) {
        const doc = { ...serverObject } as Doctor;
        doc.workdays = GetWorkdays(doc.worktimes);
        return doc;
    }
}
