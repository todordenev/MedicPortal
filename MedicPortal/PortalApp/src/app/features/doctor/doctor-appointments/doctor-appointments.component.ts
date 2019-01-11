import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/core';
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
  value = new Date();

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router,
    private localeService: LocaleService) {
    this.localeService.current.subscribe(value => this.locale = value);
  }

  ngOnInit() {

  }

}
