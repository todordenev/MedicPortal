import { NgModule } from '@angular/core';
import { CaptureImageComponent } from './capture-image/capture-image.component';

import { CommonModule } from '@angular/common';
import { PatientListitemComponent } from '@app/shared/patient-listitem/patient-listitem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguredDatepickerModule } from './ConfiguredDatepickerModule';
import { DayViewComponent } from './calendar/day-view/day-view.component';
import { DateFnsModule } from 'ngx-date-fns';
import { MaterialModule } from '@app/core/Material.module';
import { SlotComponent } from './calendar/slot/slot.component';
import { WorktimeComponent } from './worktime/worktime.component';
import { DayEventComponent } from './calendar/day-event/day-event.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ConfiguredDatepickerModule,
        ReactiveFormsModule,
        DateFnsModule.forRoot(),
    ],
    exports: [
        CaptureImageComponent,
        PatientListitemComponent,
        DayViewComponent,
        WorktimeComponent
    ],
    declarations: [
        CaptureImageComponent,
        PatientListitemComponent,
        DayViewComponent,
        SlotComponent,
        WorktimeComponent,
        DayEventComponent
    ],
    providers: [
    ]
})
export class SharedModule { }
