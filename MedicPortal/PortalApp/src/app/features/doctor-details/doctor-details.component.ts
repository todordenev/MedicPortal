import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '@app/core/entities';
import { DoctorService } from '@app/core/services';
import { CalendarEvent, fromAppointment } from '@app/shared/calendar/CalendarEvent';
import { AppointmentService } from '@app/core/services';
import { map } from 'rxjs/operators';
import { Appointment } from '@app/core/entities/appointment';
import { MatDialog } from '@angular/material';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { format } from 'date-fns';

@Component({
    selector: 'app-doctor-details',
    templateUrl: './doctor-details.component.html',
    styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
    doctorId: string;
    doctor: Doctor;
    constructor(private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private route: ActivatedRoute,
        private router: Router) { }
    calendarEvents: CalendarEvent[] = [];
    viewDate = new Date();

    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('id');
        this.doctorService.getDoctor(this.doctorId).subscribe((doc: Doctor) => this.doctor = doc);
        this.fetchEvents();
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
    createAppointment(event:Date) {        
        const formatedStartTime = format(event,'YYYY-MM-DDTHH:mm');
        this.router.navigate(['/new-appointment', { doctorid: this.doctorId, start: formatedStartTime }])
    }
    viewDateChanged(viewDate) {
        this.viewDate = viewDate;
        this.fetchEvents();
    }
}
