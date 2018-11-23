import { Appointment } from '@app/core/entities/appointment';
import { parse, startOfDay, getHours, getMinutes } from 'date-fns';


export class CalendarEvent {
    start: number;
    end: number;
    title?: string;
    body?: string;
    overlapingCounter?: number;
}

export function fromAppointment(appointment: Appointment) {
    const calEvent = new CalendarEvent();
    const start = parse(appointment.start);
    calEvent.start = getHours(start) + (getMinutes(start) / 60);
    calEvent.end = calEvent.start + (appointment.durationInMinutes / 60);
    return calEvent;
}
