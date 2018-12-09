import { Component, OnInit, Input } from '@angular/core';
import { Slot } from './slot';
import { format } from 'date-fns';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  @Input()
  slot: Slot;

  slotLable: string;
  constructor() { }

  ngOnInit() {
    if (this.slot.isWorktime) {
      this.slotLable = format(this.slot.startTime, 'HH:mm');
    } else {
      this.slotLable = 'пауза';
    }
  }
}
