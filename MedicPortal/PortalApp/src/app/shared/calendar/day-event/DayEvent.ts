import { parse, startOfDay, getHours, getMinutes } from 'date-fns';
import { AppointmentView } from '@app/core/entities/appointmentView';


export class DayEvent {
    start: number;
    duration: number;
    title?: string;
    body?: string;
    overlapingCounter?: number;
}

export function fromAppointment(appointment: AppointmentView) {
    const calEvent = new DayEvent();
    const start = parse(appointment.start);
    calEvent.start = getHours(start) + (getMinutes(start) / 60);
    calEvent.duration = appointment.durationInMinutes;
    calEvent.title = appointment.title;
    return calEvent;
}
