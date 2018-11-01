import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '@app/core/patient.service';
import { Patient } from '@app/shared/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getPatients().subscribe(patients => this.patients = patients);
  }
  @Input()
  addPatient() {
    this.patients.push(new Patient());
  }
}
