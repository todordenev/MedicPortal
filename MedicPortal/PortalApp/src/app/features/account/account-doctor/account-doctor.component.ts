import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, fromAppointment } from '@app/shared/calendar/CalendarEvent';
import { format } from 'date-fns';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-account-doctor',
    templateUrl: './account-doctor.component.html',
    styleUrls: ['./account-doctor.component.css']
})
export class AccountDoctorComponent implements OnInit {
    doctorId: any;
    viewDate = new Date();
    calendarEvents: CalendarEvent[] = [];

    constructor(
        private appointmentService: AppointmentService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('id');
       
    }
    fetchEvents() {
        this.appointmentService.getDoctorAppointments(this.doctorId,this.viewDate)
        .pipe(map(appointments => this.toEvents(appointments)))
        .subscribe(events => this.calendarEvents = events);
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
       // this.router.navigate(['/new-appointment', { doctorid: this.doctorId, start: formatedStartTime }]);
    }
    viewDateChanged(viewDate) {
        this.viewDate = viewDate;
        this.fetchEvents();
    }

}
