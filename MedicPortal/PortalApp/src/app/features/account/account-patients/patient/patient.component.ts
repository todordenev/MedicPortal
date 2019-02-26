import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createPatch, applyPatch } from 'rfc6902';
import { PatientService, ImageService } from '@app/core/services';
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
    newAvatarImage: File;
    isDeleted: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private patientService: PatientService,
        private imageService: ImageService) {

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
    }

    fileChangeEvent() {
        this.newAvatarImage = this.imageFile;
        if (this.newAvatarImage) {
            const reader = new FileReader();
            reader.onload = ((e) => {
                this.imgSrc = e.target['result'];
                this.applyImageSrc('changed');
            });
            reader.readAsDataURL(this.newAvatarImage);
        }
    }
    cratePatientForm() {
        this.patientForm = this.formBuilder.group({
            id: [this.patient.id],
            firstName: [this.patient.firstName, [Validators.required]],
            lastName: [this.patient.lastName, [Validators.required]],
            phoneNumber: [this.patient.phoneNumber],
            birthdate: [this.patient.birthdate, [Validators.required]],
            address: [this.patient.address],
            avatarImgSrc: [this.patient.avatarImgSrc]
        });
        this.imgSrc = this.patient.avatarImgSrc ? this.patient.avatarImgSrc : './assets/user-avatar.jpg';
    }

    onSubmit() {
        if (this.newAvatarImage) {
            this.imageService.saveImage(this.newAvatarImage)
                .subscribe(imageData => { this.applyImageSrc(imageData.url); this.savePatientData(); });
        } else {
            this.savePatientData();
        }
    }
    applyImageSrc(url: any): void {
        this.patientForm.patchValue({ 'avatarImgSrc': url });
        this.patientForm.markAsDirty();
    }
    savePatientData() {
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
        if (this.patient.avatarImgSrc) {
            this.imageService.deleteImageByUrl(this.patient.avatarImgSrc).subscribe(() => { });
        }
        this.patientService.delete(this.patient).subscribe(serverResult => {
            this.isDeleted = true;
        });
    }
}
