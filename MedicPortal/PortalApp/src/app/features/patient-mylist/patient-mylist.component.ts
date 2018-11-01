import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '@app/core/patient.service';
import { Patient } from '@app/shared/patient';

@Component({
  selector: 'app-patient-mylist',
  templateUrl: './patient-mylist.component.html',
  styleUrls: ['./patient-mylist.component.css']
})
export class PatientMylistComponent implements OnInit {
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
