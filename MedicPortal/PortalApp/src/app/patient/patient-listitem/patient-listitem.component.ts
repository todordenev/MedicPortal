import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/shared/patient.service';
import { createPatch, applyPatch } from 'rfc6902';

@Component({
  selector: 'app-patient-listitem',
  templateUrl: './patient-listitem.component.html',
  styleUrls: ['./patient-listitem.component.css']
})
export class PatientListitemComponent implements OnInit {
  @Input()
  patient: Patient;

  patientForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private patientService: PatientService) { 
    const test1 ='test';
  }

  ngOnInit() {
    this.cratePatientForm();
  }

  cratePatientForm() {
    this.patientForm = this.formBuilder.group({
      id: [this.patient.id],
      firstName: [this.patient.firstName],
      lastName: [this.patient.lastName],
      telefon: [this.patient.telefon],
      birthdate: [this.patient.birthdate],
      adress: [this.patient.adress]
    });
  }
  onSubmit() {
    if (this.patient.id) {
      const changedPatient = this.patientForm.value;
      const changes = createPatch(this.patient, changedPatient);

       this.patientService.update(this.patient.id, changes).subscribe(serverResult => {
        applyPatch(this.patient, changes);
        this.patientForm.markAsPristine();
      });
    } else {
      this.patientService.create(this.patient).subscribe(serverResult => {
        	
      });
    }
  }
}
