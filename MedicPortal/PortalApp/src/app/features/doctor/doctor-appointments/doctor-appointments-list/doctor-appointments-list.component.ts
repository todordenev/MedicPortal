import { Component, OnInit, Input } from '@angular/core';
import { Doctor, AppointmentService, AppointmentView } from '@app/core';

@Component({
  selector: 'app-doctor-appointments-list',
  templateUrl: './doctor-appointments-list.component.html',
  styleUrls: ['./doctor-appointments-list.component.css']
})
export class DoctorAppointmentsListComponent implements OnInit {
  @Input()
  doctor: Doctor;

  @Input()
  viewDate: Date;
  appointments: AppointmentView[];
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService.getDoctorAppointments(this.doctor.id, this.viewDate).subscribe(events => this.appointments = events)
  }

}
