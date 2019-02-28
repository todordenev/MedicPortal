import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, } from '@angular/router';
import { DoctorService, Doctor, AppointmentService, PatientService, } from '@app/core';
import { Appointment } from '@app/core/entities/appointment';
import { Patient } from '@app/core/entities/patient';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    templateUrl: './create-appointment.component.html',
    styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
    doctorId: string;
    patientId: string;
    start: any;
    doctor: any;
    patients: Patient[];
    categoryId: string;

    constructor(private route: ActivatedRoute,
        private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private location: Location,
        private messageService: MessageService,
        private patientService: PatientService) {
    }
    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('doctorid');
        this.start = this.route.snapshot.paramMap.get('start');
        this.categoryId = this.route.snapshot.paramMap.get('categoryId');
        this.doctorService.getDoctor(this.doctorId).subscribe((doc: Doctor) => this.doctor = doc);
        this.patientService.getPatients().subscribe(patients => this.setPatients(patients));
    }
    setPatients(patients: Patient[]): void {
        this.patients = patients;
        if (patients.length > 0) {
            this.patientId = patients[0].id;
        }
    }
    onNoClick(): void {
        this.location.back();
    }
    createAppointment() {
        const appointment = new Appointment();
        appointment.doctorId = this.doctorId;
        appointment.patientId = this.patientId;
        appointment.start = this.start;
        appointment.categoryId = this.categoryId;
        appointment.durationInMinutes = 10;
        this.appointmentService.create(appointment)
            .subscribe(result => this.onAppointmentCreated(), error => this.onAppointmentCreationError(error));
    }

    onAppointmentCreated() {
        this.location.back();
    }
    onAppointmentCreationError(error) {
        this.messageService.add({
            severity: 'error', summary: 'Невалидно време', life: 10000,
            detail: 'Часът е заед или времето е отминало. Върнете се при работното време за деня и оптитайте отново.'
        });
    }
}
