import { Appointment } from '@app/core/entities/appointment';
import { parse, startOfDay, getHours, getMinutes } from 'date-fns';
import { AppointmentView } from '@app/core/entities/appointmentView';


export class CalendarEvent {
    start: number;
    end: number;
    title?: string;
    body?: string;
    overlapingCounter?: number;
}

export function fromAppointment(appointment: AppointmentView) {
    const calEvent = new CalendarEvent();
    const start = parse(appointment.start);
    calEvent.start = getHours(start) + (getMinutes(start) / 60);
    calEvent.end = calEvent.start + (appointment.durationInMinutes / 60);
    calEvent.title = appointment.title;
    return calEvent;
}
