import { Component, OnInit, Input } from '@angular/core';
import { Worktime } from '@app/core';
import { startOfDay, format, addHours } from 'date-fns';

@Component({
    selector: 'app-worktime',
    templateUrl: './worktime.component.html',
    styleUrls: ['./worktime.component.css']
})
export class WorktimeComponent implements OnInit {

    @Input()
    worktime: Worktime

    fromLabel: string;
    tillLabel: string;

    constructor() { }

    ngOnInit() {
        const midnight = startOfDay(new Date());
        this.fromLabel = format(addHours(midnight, this.worktime.from), 'HH:mm');
        this.tillLabel = format(addHours(midnight, this.worktime.till), 'HH:mm');
    }
}
