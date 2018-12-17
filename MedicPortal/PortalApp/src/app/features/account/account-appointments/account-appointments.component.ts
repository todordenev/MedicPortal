import { Component, OnInit } from '@angular/core';
import { AppointmentService, AppointmentView } from '@app/core';

@Component({
  selector: 'app-account-appointments',
  templateUrl: './account-appointments.component.html',
  styleUrls: ['./account-appointments.component.css']
})
export class AccountAppointmentsComponent implements OnInit {
  appointments: AppointmentView[];

  constructor(
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    this.appointmentService.getAccountAppointments().subscribe(appointments => this.appointments = appointments);
  }
  cancel(appointment) {
    this.appointmentService.cancel(appointment.id).subscribe(() => appointment.canceled = true);
  }
}
