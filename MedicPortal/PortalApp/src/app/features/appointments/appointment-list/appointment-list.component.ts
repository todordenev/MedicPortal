import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Worktime, Appointment } from '@app/core/entities';
import { DoctorService } from '@app/core/services';
import { AppointmentService } from '@app/core/services';
import { format, addDays, getDay, parse } from 'date-fns';
import { AppointmentView } from '@app/core/entities';

@Component({
    templateUrl: './appointment-list.component.html',
    styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
    doctorId: string;
    _doctor: Doctor;
    calendarEvents: AppointmentView[] = [];
    eventsLoaded = false;
    _viewDate = new Date();
    worktimes: Worktime[] = [];
    constructor(private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private route: ActivatedRoute,
        private router: Router) { }
    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('id');
        const dateParameter = this.route.snapshot.paramMap.get('viewdate');
        if (dateParameter) {
            this._viewDate = parse(dateParameter);
        } else {
            this._viewDate = new Date();
        }
        this.doctorService.getDoctor(this.doctorId).subscribe((doc: Doctor) => this.doctor = doc);
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
    set doctor(value) {
        this._doctor = value;
        this.estimateWorktimes();
        if (this.worktimes.length > 0) {
            this.fetchEvents();
        }
    }
    get doctor() {
        return this._doctor;
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
        this.eventsLoaded = false;
        this.appointmentService.getAppointments(this.doctorId, this.viewDate)
            .subscribe(events => this.setEvents(events));
    }

    setEvents(events) {
        this.calendarEvents = events;
        this.eventsLoaded = true;
    }
    get imageUrl() {
        return './assets/doctor_' + this.doctor.id + '.jpg';
    }

    createAppointment(event) {
        const now = new Date();
        if (event < now) {
            return;
        }
        const startTime = event.time;
        const appointmentType = event.appointmentType;
        const formatedStartTime = format(startTime, 'YYYY-MM-DDTHH:mm');
        this.router.navigate(['/appointments/new', { doctorid: this.doctorId, start: formatedStartTime, categoryId: appointmentType }]);
    }

    moveViewDate(days: number) {
        this.viewDate = addDays(this.viewDate, days);
        this.router.navigate(['/appointments/view/1', { viewdate: format(this.viewDate, 'YYYY-MM-DD') }]);
    }
}
