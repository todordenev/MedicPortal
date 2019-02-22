import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createPatch, applyPatch } from 'rfc6902';
import { PatientService } from '@app/core/services';
import { Patient } from '@app/core/entities/patient';
import { format } from 'date-fns';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
    @Input()
    patient: Patient;
    patientForm: FormGroup;
    imgSrc: string;
    @ViewChild('fileInput')
    fileInput: ElementRef;
    constructor(private formBuilder: FormBuilder, private patientService: PatientService) {

    }
    get imageFile(): File {
        const input = this.fileInput.nativeElement;
        if (input.files && input.files[0]) {
            return input.files[0];
        }
        return null;
    }

    ngOnInit() {
        this.cratePatientForm();
        this.imgSrc = this.patient.avatarImgSrc ? this.patient.avatarImgSrc : './assets/user-avatar.jpg';
    }

    fileChangeEvent() {
        const file = this.imageFile;
        if (file) {
            const reader = new FileReader();
            reader.onload = ((e) => {
                this.imgSrc = e.target['result'];
            });
            reader.readAsDataURL(file);
        }
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
