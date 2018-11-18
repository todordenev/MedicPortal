import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarSlot } from '../CalendarSlot';
import { format, startOfDay, addHours, addDays } from 'date-fns';
import { CalendarEvent } from '../CalendarEvent';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {

  @Input()
  start: number;
  @Input()
  end: number;
  @Input()
  duration = 0.25; // calndar-slot = 25px => 1 Hour = 100px;
  errorMessage: string;
  slots: any[] = [];
  viewDate: Date;

  _events: CalendarEvent[] = [];
  @Output()
  viewDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  set events(value) {
    this._events = value;
    this.arrangeEvents();
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
    //   this.arrangeEvents();
    this.viewDate = new Date();
  }
  createSlots() {
    let counter = this.start;
    do {
      const slot = new CalendarSlot();
      if (counter % 1 === 0) {
        slot.hourLabel = format(addHours(startOfDay(new Date()), counter), 'HH:mm');
      }
      slot.start = counter;
      counter += this.duration;
      slot.end = counter;
      this.slots.push(slot);
    } while (counter < this.end);
  }
  arrangeEvents(): any {
    if (typeof (this._events) === typeof ([]) && this._events.length > 0) {
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
