import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, } from '@angular/router';
import { DoctorService, Doctor, AppointmentService, PatientService, } from '@app/core';
import { Appointment } from '@app/core/entities/appointment';
import { Patient } from '@app/shared/patient';

@Component({
    selector: 'app-new-appointment',
    templateUrl: './new-appointment.component.html',
    styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
    doctorId: string;
    patientId: string;
    start: any;
    doctor: any;
    patients: Patient[];

    constructor(private route: ActivatedRoute,
        private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private location: Location, private patientService: PatientService) {
    }
    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('doctorid');
        this.start = this.route.snapshot.paramMap.get('start');
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

    }
    createAppointment() {
        const appointment = new Appointment();
        appointment.doctorId = this.doctorId;
        appointment.patientId = this.patientId;
        appointment.start = this.start;
        appointment.durationInMinutes = 15;
        this.appointmentService.create(appointment).subscribe(() => this.location.back());
    }
}
