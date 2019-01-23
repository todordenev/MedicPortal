import { Component, OnInit, Input } from '@angular/core';
import { Doctor, AppointmentService, AppointmentView, Worktime, DoctorService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDay, format, addDays } from 'date-fns';

@Component({
  selector: 'app-doctor-appointments-list',
  templateUrl: './doctor-appointments-list.component.html',
  styleUrls: ['./doctor-appointments-list.component.css']
})
export class DoctorAppointmentsListComponent implements OnInit {

  @Input()
  doctor: Doctor;
  calendarEvents: AppointmentView[] = [];
  _viewDate = new Date();
  categoryId = '0';
  worktimes: Worktime[] = [];
  constructor(private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this._viewDate = new Date();
    this.estimateWorktimes();
    if (this.worktimes.length > 0) {
      this.fetchEvents();
    }
  }

  get viewDate() {
    return this._viewDate;
  }
  set viewDate(value) {
    this._viewDate = value;
    this.calendarEvents = [];
    this.estimateWorktimes();
    if (this.worktimes.length > 0) {
      this.fetchEvents();
    }
  }

  estimateWorktimes(): any {
    const currentDayNumber = getDay(this.viewDate) - 1;
    const workday = this.doctor.workdays.find(wd => wd.dayNumber === currentDayNumber);
    if (workday) {
      this.worktimes = workday.worktimes;
    } else {
      this.worktimes = [];
    }
  }
  fetchEvents() {
    this.appointmentService.getAppointments(this.doctor.id, this.viewDate)
      .subscribe(events => this.calendarEvents = events);
  }
  get imageUrl() {
    return './assets/doctor_' + this.doctor.id + '.jpg';
  }

  createAppointment(event: Date) {
    const now = new Date();
    if (event < now) {
      return;
    }
    const formatedStartTime = format(event, 'YYYY-MM-DDTHH:mm');
    this.router.navigate(['/new-appointment', { doctorid: this.doctor.id, start: formatedStartTime, categoryId: this.categoryId }]);
  }
  viewDateChanged(viewDate) {
    this.viewDate = viewDate;
  }
  moveViewDate(days: number) {
    this.viewDate = addDays(this.viewDate, days);
  }

}
