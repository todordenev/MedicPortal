import { NgModule } from '@angular/core';
import { CaptureImageComponent } from './capture-image/capture-image.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguredDatepickerModule } from './ConfiguredDatepickerModule';
import { DayViewComponent } from './calendar/day-view/day-view.component';
import { DateFnsModule } from 'ngx-date-fns';
import { SlotComponent } from './calendar/slot/slot.component';
import { WorktimeComponent } from './worktime/worktime.component';
import { DayEventComponent } from './calendar/day-event/day-event.component';
import { MatIconModule, MatButton, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConfiguredDatepickerModule,
        ReactiveFormsModule,
        DateFnsModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        CaptureImageComponent,
        DayViewComponent,
        WorktimeComponent
    ],
    declarations: [
        CaptureImageComponent,
        DayViewComponent,
        SlotComponent,
        WorktimeComponent,
        DayEventComponent
    ],
    providers: [
    ]
})
export class SharedModule { }
