import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../entities/appointment';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { handleError } from '../entities/helpers';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  serviceEndpoint = 'api/appointments';

  constructor(private http: HttpClient) { }

  getAppointments(doctorId: string, date?: Date): Observable<Appointment[]> {
    if (!date) {
      date = new Date();
    }
    const nowString = format(date, 'YYYY-MM-DDTHH:mm');
    return this.http.get(this.serviceEndpoint + '/doctor/' + doctorId + '/' + nowString)
      .pipe(
        map(serverResult => this.setAppointments(serverResult)),
        catchError(handleError)
      );
  }

  private setAppointments(serverResult): Appointment[] {
    const result: Appointment[] = [];
    serverResult.forEach(element => {
      result.push(element as Appointment);
    });
    return result;
  }
}
