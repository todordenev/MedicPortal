import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '@app/core/entities';
import { DoctorService } from '@app/core/services';
import { CalendarEvent } from '@app/shared/calendar/CalendarEvent';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: Doctor;
  constructor(private doctorService: DoctorService, private route: ActivatedRoute) { }
  appointments: CalendarEvent[] = [];
  viewDate = new Date();

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.doctorService.getDoctor(id).subscribe((doc: Doctor) => this.doctor = doc);
    this.appointments.push(new CalendarEvent(8, 8.25, 'Test1', 'Das ist ein Termin'));
    this.appointments.push(new CalendarEvent(8, 8.50, 'Test2', 'Das ist ein Termin'));
    this.appointments.push(new CalendarEvent(9, 9.50, 'Test3', 'Das ist ein Termin'));
    this.appointments.push(new CalendarEvent(10, 10.5, 'Test4', 'Das ist ein Termin'));
  }
  get imageUrl() {
    return './assets/doctor_' + this.doctor.id + '.jpg';
  }
}
