import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthHttpClientService } from '../core/auth-http-client.service';
import { Patient } from '@app/shared/patient';


@Injectable({
    providedIn: 'root'
})
export class PatientService {
    endpointUrl = '/api/patients';
    patients: Patient[] = [];
    constructor(private http: AuthHttpClientService) { }

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
            serverResult.forEach(element => {
                const doc = this.mapServerPatient(element);
                this.patients.push(doc);
            });
        }
        return this.patients;
    }
    mapServerPatient(serverObject): Patient {
        const patient = new Patient(serverObject);
        return patient;
    }

    update(id: string, value): Observable<Patient> {
        return this.http.patch(this.endpointUrl + '/' + id, value)
            .pipe(
                map(serverResult => this.mapServerPatient(serverResult)),
                catchError(this.handleError)
            );
    }
    create(patient: Patient): any {
        return this.http.post(this.endpointUrl, patient)
            .pipe(
                map(serverResult => this.mapServerPatient(serverResult)),
                catchError(this.handleError)
            );
    }
    delete(patient: Patient): any {
        if (patient.id) {
            return this.http.delete(this.endpointUrl + '/' + patient.id)
                .pipe(
                    map(serverResult => this.removeFromPatients(patient)),
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
