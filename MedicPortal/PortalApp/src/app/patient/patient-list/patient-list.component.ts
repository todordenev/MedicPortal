import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';
import { Patient } from '../patient';

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
  addPatient(event) {
    event.stopPropagation();
    this.patients.push(new Patient());
  }
}
