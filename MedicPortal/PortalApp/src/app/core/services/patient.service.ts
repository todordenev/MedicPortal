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
    patients: Patient[] = [];
    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        if (this.patients.length > 0) {
            return of(this.patients);
        }
        return this.http.get(this.endpointUrl)
            .pipe(
                map(serverResult => this.setPatients(serverResult)),
                catchError(this.handleError)
            );
    }

    setPatients(serverResult) {
        if (serverResult instanceof Array) {
            serverResult.forEach(patient => {
                this.patients.push(patient);
            });
        }
        return this.patients;
    }

    update(id: string, value): Observable<Patient> {
        return this.http.patch(this.endpointUrl + '/' + id, value)
            .pipe(
                map(serverResult => serverResult as Patient ),
                catchError(this.handleError)
            );
    }
    create(patient: Patient): any {
        return this.http.post(this.endpointUrl, patient)
            .pipe(
                map(serverResult =>  serverResult as Patient),
                catchError(this.handleError)
            );
    }
    delete(patient: Patient): any {
        if (patient.id) {
            return this.http.delete(this.endpointUrl + '/' + patient.id)
                .pipe(
                    map(() => this.removeFromPatients(patient)),
                    catchError(this.handleError)
                );
        } else {
            of(this.removeFromPatients(patient));
        }
    }
    private removeFromPatients(patient: Patient) {
        const index = this.patients.indexOf(patient, 0);
        if (index > -1) {
            this.patients.splice(index, 1);
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
