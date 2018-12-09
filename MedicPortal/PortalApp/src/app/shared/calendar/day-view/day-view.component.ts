import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarSlot } from '../slot/CalendarSlot';
import { format, startOfDay, addHours, addDays, differenceInMinutes } from 'date-fns';
import { CalendarEvent } from '../CalendarEvent';

@Component({
    selector: 'app-day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
    _events: CalendarEvent[] = [];
    errorMessage: string;
    slots: any[] = [];

    @Input()
    showTimes = [{ start: 8.5, end: 10 }, { start: 10.25, end: 13 }];
    @Input()
    duration = 0.25; // calendar-slot = 25px => 1 Hour = 100px;    
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
        this.createSlots();
    }
    createSlots() {
        for (let i = 0; i < this.showTimes.length; i++) {
            let counter = this.showTimes[i].start;
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
            } while (counter < this.showTimes[i].end);

            if ((i + 1) < this.showTimes.length) {
                const slot = new CalendarSlot();
                slot.start = counter;
                slot.end = counter + this.duration;
                slot.hourLabel = 'пауза';
                this.slots.push(slot);
            }
        }
    }
    /**
     * Prüft, ob die Termine sich überlapen.
     */
    private moveOverlapingEvents(): any {
        if (this._events.length > 0) {
            this._events = this._events.sort((a, b) => a.start - b.start);
            const verticalLines: number[] = [];
            verticalLines.push(0);
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
}
