import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,  } from '@angular/router';
import { DoctorService, Doctor, AppointmentService, } from '@app/core';
import { Appointment } from '@app/core/entities/appointment';

@Component({
    selector: 'app-new-appointment',
    templateUrl: './new-appointment.component.html',
    styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
    doctorId: any;
    start: any;
    doctor: any;

    constructor(private route: ActivatedRoute,
        private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private location: Location) {
    }

    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('doctorid');
        this.start = this.route.snapshot.paramMap.get('start');
        this.doctorService.getDoctor(this.doctorId).subscribe((doc: Doctor) => this.doctor = doc);
    }
    onNoClick(): void {

    }
    createAppointment() {
        const appointment = new Appointment();
        appointment.doctorId = this.doctorId;
        
        this.appointmentService.create(appointment).subscribe(() => this.location.back());
    }
}
