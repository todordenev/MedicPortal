import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '@app/core/services';
import { Patient } from '@app/core/entities/patient';

@Component({
  selector: 'app-account-patients',
  templateUrl: './account-patients.component.html',
  styleUrls: ['./account-patients.component.css']
})
export class AccountPatientsComponent implements OnInit {
  patients: Patient[] = [];
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getPatients().subscribe(patients => this.patients = patients);
  }
  @Input()
  addPatient() {
    this.patients.unshift(new Patient());
  }

}
