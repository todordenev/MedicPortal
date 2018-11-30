import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarSlot } from '../CalendarSlot';
import { format, startOfDay, addHours, addDays, differenceInMinutes } from 'date-fns';
import { CalendarEvent } from '../CalendarEvent';

@Component({
    selector: 'app-day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
    _events: CalendarEvent[] = [];

    @Input()
    start: number;
    @Input()
    end: number;
    @Input()
    duration = 0.25; // calendar-slot = 25px => 1 Hour = 100px;
    errorMessage: string;
    slots: any[] = [];
    @Input()
    viewDate: Date;
    @Output()
    viewDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
    @Output()
    newEventClicked: EventEmitter<Date> = new EventEmitter<Date>();
    @Output()
    eventClicked: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

    createNewEvent(time) {
        this.newEventClicked.emit(time);
    }
    @Input()
    set events(value) {
        this._events = value;
        this.moveOverlapingEvents();
    }
    get events() {
        return this._events;
    }
    constructor() {
    }

    ngOnInit() {
        this.start = 8;
        this.end = 16;
        if (this.end <= this.start) {
            this.errorMessage = 'Wrong Parameters. End cannot be smaller than start.';
        }
        this.createSlots();
        this.viewDate = new Date();
    }
    createSlots() {
        let counter = this.start;
        do {
            const slot = new CalendarSlot();
            slot.startTime = addHours(startOfDay(new Date()), counter);
            if (counter % 1 === 0) {
                slot.hourLabel = format(slot.startTime, 'HH:mm');
            }
            slot.start = counter;
            counter += this.duration;
            slot.end = counter;
            this.slots.push(slot);
        } while (counter < this.end);
    }
    /**
     * Prüft, ob die Termine sich überlapen.
     */
    private moveOverlapingEvents(): any {
        if (this._events.length > 0) {
            this._events = this._events.sort((a, b) => a.start - b.start);
            const verticalLines: number[] = [];
            verticalLines.push(this.start);
            this._events.forEach(event => {
                let indexLine = 0;
                let lineFound = false;
                do {
                    let currentLineEnd = verticalLines[indexLine];
                    if (currentLineEnd <= event.start) {
                        currentLineEnd = event.end;
                        event.overlapingCounter = indexLine;
                        verticalLines[indexLine] = currentLineEnd;
                        lineFound = true;
                        break;
                    }
                    indexLine++;
                } while (verticalLines.length !== indexLine);
                if (!lineFound) {
                    event.overlapingCounter = verticalLines.length;
                    verticalLines.push(event.end);
                }
            });
        }
    }
    moveViewDate(days: number) {
        this.viewDate = addDays(this.viewDate, days);
        this.viewDateChanged.emit(this.viewDate);
    }
}
