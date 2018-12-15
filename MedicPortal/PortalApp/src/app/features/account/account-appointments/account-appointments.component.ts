import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/core';

@Component({
  selector: 'app-account-appointments',
  templateUrl: './account-appointments.component.html',
  styleUrls: ['./account-appointments.component.css']
})
export class AccountAppointmentsComponent implements OnInit {

  constructor(
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    this.appointmentService.getAccountAppointments();
  }

}
