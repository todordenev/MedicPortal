import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createPatch, applyPatch } from 'rfc6902';
import { PatientService } from '@app/core/services';
import { Patient } from '@app/shared/patient';
import { format } from 'date-fns';

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
    const test1 = 'test';
  }

  ngOnInit() {
    this.cratePatientForm();
  }

  cratePatientForm() {
    this.patientForm = this.formBuilder.group({
      id: [this.patient.id],
      firstName: [this.patient.firstName, [Validators.required]],
      lastName: [this.patient.lastName, [Validators.required]],
      telefon: [this.patient.telefon],
      birthdate: [this.patient.birthdate, [Validators.required]],
      adress: [this.patient.adress]
    });
  }

  onSubmit() {
    const changedPatient = this.patientForm.value;
    if (changedPatient.birthdate instanceof Date) {
      // geburtsdatum wurde geändert=> in String umwandeln, da createPatch mit Date nicht gut funktioniert.
      changedPatient.birthdate = format(changedPatient.birthdate);
    }
    if (this.patient.id) {
      const changes = createPatch(this.patient, changedPatient);
      this.patientService.update(this.patient.id, changes).subscribe(serverResult => {
        applyPatch(this.patient, changes);
        this.patientForm.markAsPristine();
      });
    } else {
      this.patientService.create(changedPatient).subscribe(serverResult => {
        this.patientForm.markAsPristine();
      });
    }
  }
  deletePatient() {
    this.patientService.delete(this.patient).subscribe(serverResult => {

    });
  }
}
