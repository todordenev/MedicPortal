import { Component, OnInit } from '@angular/core';
import { AppointmentService, DoctorService, Doctor } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleSettings } from 'primeng/calendar';
import { LocaleService } from '@app/core/services/locale.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {
  locale: LocaleSettings;
  viewDate = new Date();
  private _myDoctors: Doctor[];
  get myDoctors(): Doctor[] {
    return this._myDoctors;
  }
  set myDoctors(doctors: Doctor[]) {
    this._myDoctors = doctors;
  }

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private localeService: LocaleService) {
  }

  ngOnInit() {
    this.localeService.current.subscribe(value => this.locale = value);
    this.doctorService.getMyDoctors().subscribe(doctors => this.myDoctors = doctors);
  }

}
