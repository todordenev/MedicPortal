import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationCodesService {
  serviceEndpointUrl = '/api/registration-codes';

  constructor(private http: HttpClient) { }

  getRegistrationCodes(doctorId: string, count: number) {
    return this.http.post(this.serviceEndpointUrl, { 'count': count, 'doctorId': doctorId });
  }
}
