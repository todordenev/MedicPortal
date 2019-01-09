import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

}
