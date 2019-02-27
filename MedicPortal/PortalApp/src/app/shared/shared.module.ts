import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguredDatepickerModule } from './ConfiguredDatepickerModule';
import { DayViewComponent } from './calendar/day-view/day-view.component';
import { DateFnsModule } from 'ngx-date-fns';
import { SlotComponent } from './calendar/slot/slot.component';
import { WorktimeComponent } from './worktime/worktime.component';
import { DayEventComponent } from './calendar/day-event/day-event.component';
import { MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConfiguredDatepickerModule,
        ReactiveFormsModule,
        DateFnsModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [
        DayViewComponent,
        WorktimeComponent,
        ConfirmDialogComponent

    ],
    entryComponents: [ConfirmDialogComponent],
    declarations: [
        DayViewComponent,
        SlotComponent,
        WorktimeComponent,
        DayEventComponent,
        ConfirmDialogComponent
    ],
    providers: [
    ]
})
export class SharedModule { }
