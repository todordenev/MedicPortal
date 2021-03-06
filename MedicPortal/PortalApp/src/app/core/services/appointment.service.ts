import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { handleError } from '../entities/helpers';
import { AppointmentView } from '../entities/appointmentView';
import { parse, format } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {


    serviceEndpoint = 'api/appointments';

    constructor(private http: HttpClient) { }

    getAppointments(doctorId: string, date?: Date): Observable<AppointmentView[]> {
        if (!date) {
            date = new Date();
        }
        const nowString = format(date, 'YYYY-MM-DDTHH:mm');
        return this.http.get(this.serviceEndpoint + '/doctor/' + doctorId + '/' + nowString)
            .pipe(
                map(serverResult => this.mapAppointments(serverResult)),
                catchError(handleError)
            );
    }

    getDoctorAppointments(doctorId: string, date?: Date): Observable<AppointmentView[]> {
        if (!date) {
            date = new Date();
        }
        const nowString = format(date, 'YYYY-MM-DDTHH:mm');
        return this.http.get(this.serviceEndpoint + '/fordoctor/' + doctorId + '/' + nowString)
            .pipe(
                map(serverResult => this.mapAppointments(serverResult)),
                catchError(handleError)
            );
    }
    getAccountAppointments(): Observable<AppointmentView[]> {
        return this.http.get(this.serviceEndpoint + '/foraccount')
            .pipe(
                map(serverResult => this.mapAppointments(serverResult)),
                catchError(handleError)
            );
    }
    getAllAccountAppointments(): Observable<AppointmentView[]> {
        return this.http.get(this.serviceEndpoint + '/allforaccount')
            .pipe(
                map(serverResult => this.mapAppointments(serverResult)),
                catchError(handleError)
            );
    }

    create(appointment): any {
        return this.http.post(this.serviceEndpoint, appointment)
            .pipe(
                catchError(handleError)
            );
    }

    cancel(id: any): any {
        return this.http.delete(this.serviceEndpoint + '/' + id);
    }

    private mapAppointments(serverResult): AppointmentView[] {
        serverResult.forEach(element => {
            const appointment = element as AppointmentView;
            appointment.start = parse(element.start);

        });
        return serverResult;
    }

}
