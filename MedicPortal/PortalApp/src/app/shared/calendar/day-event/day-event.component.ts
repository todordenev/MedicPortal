import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { AppointmentView } from '@app/core';
import { addMinutes } from 'date-fns';

@Component({
  selector: 'app-day-event',
  templateUrl: './day-event.component.html',
  styleUrls: ['./day-event.component.css']
})
export class DayEventComponent implements OnInit {

  @Input()
  event: AppointmentView;
  title: string;
  start: Date;
  end: Date;
  categoryId: number;
  constructor() { }

  ngOnInit() {
    this.start = this.event.start;
    this.end = addMinutes(this.event.start, this.event.durationInMinutes);
    this.categoryId = this.event.categoryId;
  }
}
