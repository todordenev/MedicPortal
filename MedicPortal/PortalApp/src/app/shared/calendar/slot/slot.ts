import { Appointment } from '@app/core';

export class Slot {
    start: Date;
    end: Date;
    duration: number;
    canBook: boolean;
    isWorktime: boolean;
    nextSlot: Slot;
    events: Appointment[] = [];
}
