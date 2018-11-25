import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DoctorService, Doctor } from '@app/core';

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
        private doctorService: DoctorService,) {
        
    }

    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('doctorid');
        this.start = this.route.snapshot.paramMap.get('start');
        this.doctorService.getDoctor(this.doctorId).subscribe((doc: Doctor) => this.doctor = doc);
    }
    onNoClick(): void {

    }
}
