import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Slot } from '../slot/slot';
import { format, startOfDay, addHours, addDays, differenceInMinutes, addMinutes, compareAsc } from 'date-fns';
import { CalendarEvent } from '../CalendarEvent';
import { Worktime } from '@app/core';

@Component({
    selector: 'app-day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
    private _events: CalendarEvent[] = [];
    private _worktimes: Worktime[] = [];
    errorMessage: string;
    slots: any[] = [];

    @Input()
    set worktimes(value) {
        this._worktimes = value;
        this.createSlots();
    }
    get worktimes() {
        return this._worktimes;
    }
    @Input()
    duration = 10; // calendar-slot = 25px => 1 Hour = 100px;
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
        this.slots = [];
        for (let i = 0; i < this.worktimes.length; i++) {
            const worktime = this.worktimes[i];
            const worktimeStart = addHours(startOfDay(new Date()), worktime.from);
            const worktimeEnd = addHours(startOfDay(new Date()), worktime.till);
            let currentTime = worktimeStart;
            do {
                const slot = new Slot();
                slot.startTime = currentTime;
                slot.duration = this.duration;
                slot.isWorktime = true;
                this.slots.push(slot);
                currentTime = addMinutes(currentTime, this.duration);
            } while (compareAsc(worktimeEnd, currentTime) > 0);

            if ((i + 1) < this.worktimes.length) {
                const slot = new Slot();
                slot.startTime = currentTime;
                slot.duration = differenceInMinutes(this.worktimes[i + 1].from, worktimeEnd);
                slot.isWorktime = false;
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
