import { Component, OnInit, Input } from '@angular/core';
import { CalendarSlot } from '../CalendarSlot';
import { format, startOfDay, addHours } from 'date-fns';

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
  duration = 0.25;
  errorMessage: string;
  slots: any[] = [];

  constructor() { }

  ngOnInit() {
    this.start = 8;
    this.end = 16;
    if (this.end <= this.start) {
      this.errorMessage = 'Wrong Parameters. End cannot be smaller than start.';
    }
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
}
