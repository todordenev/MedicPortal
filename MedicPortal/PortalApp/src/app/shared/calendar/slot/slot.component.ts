import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Slot } from './slot';
import { format, getMinutes } from 'date-fns';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  @Input()
  slot: Slot;
  hourSlot = false;
  slotLable: string;
  now = Date.now();
  @Output()
  newEventClicked: EventEmitter<Date> = new EventEmitter<Date>();
  constructor() { }

  ngOnInit() {
    if (this.slot.isWorktime) {
      this.slotLable = format(this.slot.start, 'HH:mm');
    }
    this.hourSlot = getMinutes(this.slot.start) === 0;
  }
  createNewEvent(time) {
    this.newEventClicked.emit(time);
  }
}
