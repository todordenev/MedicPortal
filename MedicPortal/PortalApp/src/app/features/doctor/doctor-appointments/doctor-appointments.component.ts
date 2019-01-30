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
  private _myDoctors: Doctor[];
  get myDoctors(): Doctor[] {
    return this._myDoctors;
  }
  set myDoctors(doctors: Doctor[]) {
    this._myDoctors = doctors;
  }

  constructor(
    private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.doctorService.getMyDoctors().subscribe(doctors => this.myDoctors = doctors);
  }

}
