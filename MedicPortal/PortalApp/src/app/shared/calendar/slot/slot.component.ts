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
    slotLable: string;
    now = Date.now();
    @Output()
    newEventClicked: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    showNewTools = true;
    constructor() { }

    ngOnInit() {
        this.slotLable = this.slot.isWorktime ? format(this.slot.start, 'HH:mm') : 'пауза';
    }
    createNewEvent(time, appointmentType) {

        this.newEventClicked.emit({ 'time': time, 'appointmentType': appointmentType });
    }
}
