import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Workday, Worktime } from '@app/core/entities';
import { DoctorService } from '@app/core/services';
import { CalendarEvent, fromAppointment } from '@app/shared/calendar/CalendarEvent';
import { AppointmentService } from '@app/core/services';
import { map } from 'rxjs/operators';
import { format, addDays, getDay } from 'date-fns';

@Component({
    selector: 'app-doctor-details',
    templateUrl: './doctor-details.component.html',
    styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
    doctorId: string;
    _doctor: Doctor;
    calendarEvents: CalendarEvent[] = [];
    _viewDate = new Date();
    appointmentCategory;
    worktimes: Worktime[] = [];
    constructor(private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private route: ActivatedRoute,
        private router: Router) { }
    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('id');
        this._viewDate = new Date();
        this.doctorService.getDoctor(this.doctorId).subscribe((doc: Doctor) => this.doctor = doc);
    }
    get viewDate() {
        return this._viewDate;
    }
    set viewDate(value) {
        this._viewDate = value;
        this.estimateWorktimes();
        this.fetchEvents();
    }
    set doctor(value) {
        this._doctor = value;
        this.estimateWorktimes();
        this.fetchEvents();
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
        this.appointmentService.getAppointments(this.doctorId, this.viewDate)
            .pipe(map(appointments => this.toEvents(appointments)))
            .subscribe(events => this.calendarEvents = events);
    }
    get imageUrl() {
        return './assets/doctor_' + this.doctor.id + '.jpg';
    }
    toEvents(appointments: any[]): CalendarEvent[] {
        console.log('toEvents called');
        const events: CalendarEvent[] = [];
        appointments.forEach(el => {
            events.push(fromAppointment(el));
        });
        return events;
    }
    createAppointment(event: Date) {
        const formatedStartTime = format(event, 'YYYY-MM-DDTHH:mm');
        this.router.navigate(['/new-appointment', { doctorid: this.doctorId, start: formatedStartTime }]);
    }
    viewDateChanged(viewDate) {
        this.viewDate = viewDate;
    }
    moveViewDate(days: number) {
        this.viewDate = addDays(this.viewDate, days);
    }
}
