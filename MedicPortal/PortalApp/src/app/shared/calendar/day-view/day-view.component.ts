import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Slot } from '../slot/slot';
import { format, startOfDay, addHours, addDays, differenceInMinutes, addMinutes, compareAsc } from 'date-fns';
import { Worktime, Appointment } from '@app/core';
import { DayEvent } from '../day-event/DayEvent';
import { timer, Subscription } from 'rxjs';

@Component({
    selector: 'app-day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit, OnDestroy {

    private _events: Appointment[] = [];
    private _worktimes: Worktime[] = [];
    private _viewDate: Date;
    private _timerSubscription: Subscription;
    private _workdayStart: number;

    errorMessage: string;
    slots: Slot[] = [];
    now: Date = new Date();
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
    @Input()
    set viewDate(value: Date) {
        this._viewDate = value;
        this.createSlots();
    }
    get viewDate() {
        return this._viewDate;
    }
    @Output()
    newEventClicked: EventEmitter<Date> = new EventEmitter<Date>();
    @Output()
    eventClicked: EventEmitter<Appointment> = new EventEmitter<Appointment>();

    createNewEvent(time) {
        this.newEventClicked.emit(time);
    }
    @Input()
    set events(value) {
        this._events = value;
        this.assignToSlot();
    }
    get events() {
        return this._events;
    }
    constructor() {
    }
    ngOnInit() {
        const source = timer(60 * 1000);
        this._timerSubscription = source.subscribe(() => this.now = new Date());
    }
    ngOnDestroy(): void {
        this._timerSubscription.unsubscribe();
    }
    createSlots() {
        this.slots = [];
        if (!this.viewDate || this.worktimes.length === 0) {
            return;
        }
        this._workdayStart = this.worktimes[0].from;

        for (let i = 0; i < this.worktimes.length; i++) {
            const worktime = this.worktimes[i];
            const worktimeStart = addHours(startOfDay(this.viewDate), worktime.from);
            const worktimeEnd = addHours(startOfDay(this.viewDate), worktime.till);
            let currentTime = worktimeStart;
            let currentSlot: Slot;
            let previousSlot: Slot;
            do {
                currentSlot = new Slot();
                currentSlot.start = currentTime;
                currentSlot.end = addMinutes(currentTime, this.duration);
                currentSlot.duration = this.duration;
                currentSlot.isWorktime = true;
                this.slots.push(currentSlot);
                currentTime = addMinutes(currentTime, this.duration);
                if (previousSlot) {
                    previousSlot.nextSlot = currentSlot;
                }
                previousSlot = currentSlot;

            } while (compareAsc(worktimeEnd, currentTime) > 0);

            if ((i + 1) < this.worktimes.length) {
                const nextWorktimeStart = addHours(startOfDay(this.viewDate), this.worktimes[i + 1].from);
                const slot = new Slot();
                slot.start = currentTime;
                slot.duration = differenceInMinutes(nextWorktimeStart, worktimeEnd);
                slot.isWorktime = false;
                this.slots.push(slot);
            }
        }
    }
    /**
     * Prüft, ob die Termine sich überlapen.
     */
    private assignToSlot(): any {
        if (this._events.length > 0) {
            this.events.forEach(event => {
                this.assignEventToSlot(event);
            });
        }
    }

    private assignEventToSlot(event: Appointment) {
        const eventStart = event.start;
        const slot = this.slots.find(sl => (sl.start <= eventStart && eventStart < sl.end));
        if (slot) {
            slot.events.push(event);
        }
    }
}
