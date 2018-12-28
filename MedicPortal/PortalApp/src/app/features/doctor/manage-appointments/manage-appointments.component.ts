import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

}
