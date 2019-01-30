import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewPatientService {
  serviceUrl = '/api/new-patients';

  constructor() { }

  getCodes() {

  }
}
