import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { AppointmentView } from '@app/core';

@Component({
  selector: 'app-day-event',
  templateUrl: './day-event.component.html',
  styleUrls: ['./day-event.component.css']
})
export class DayEventComponent implements OnInit {

  @Input()
  event: AppointmentView;
  title: string;
  constructor() { }

  ngOnInit() {
  }
}
