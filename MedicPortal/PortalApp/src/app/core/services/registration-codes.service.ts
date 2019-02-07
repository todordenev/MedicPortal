import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { handleError } from '../entities/helpers';
@Injectable({
    providedIn: 'root'
})
export class RegistrationCodesService {

    serviceEndpointUrl = '/api/registration-codes';
    constructor(private http: HttpClient) { }

    getRegistrationCodes(doctorId: string, count: number): Observable<string[]> {
        const generateCodesUrl = this.serviceEndpointUrl + '/' + doctorId + '/' + count;
        return this.http.post(generateCodesUrl, {})
            .pipe(
                map(serverResult => this.mapServerResult(serverResult)),
                catchError(handleError)
            );
    }
    applyRegistrationCode(doctorId: string, code: string): Observable<void> {
        const applyCodeUrl = this.serviceEndpointUrl + '/apply';
        return this.http.post(applyCodeUrl, { 'DoctorId': doctorId, 'Code': code })
            .pipe(
                map(() => { return; }),
                catchError(handleError)
            );
    }

    mapServerResult(serverResult): string[] {
        return serverResult as string[];
    }
}
