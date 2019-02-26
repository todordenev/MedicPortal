import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Patient } from '@app/core/entities/patient';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    endpointUrl = '/api/patients';
    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        return this.http.get(this.endpointUrl)
            .pipe(
                map(serverResult => this.mapToPatients(serverResult)),
                catchError(this.handleError)
            );
    }
    mapToPatients(serverResult) {
        const patients: Patient[] = [];
        if (serverResult instanceof Array) {
            serverResult.forEach(patient => {
                patients.push(patient);
            });
        }
        return patients;
    }

    update(id: string, value): Observable<Patient> {
        return this.http.patch(this.endpointUrl + '/' + id, value)
            .pipe(
                map(serverResult => serverResult as Patient),
                catchError(this.handleError)
            );
    }
    create(patient: Patient): any {
        return this.http.post(this.endpointUrl, patient)
            .pipe(
                map(serverResult => serverResult as Patient),
                catchError(this.handleError)
            );
    }
    delete(patient: Patient): any {
        if (patient.id) {
            return this.http.delete(this.endpointUrl + '/' + patient.id)
                .pipe(
                    catchError(this.handleError)
                );
        } else {
            of();
        }
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
