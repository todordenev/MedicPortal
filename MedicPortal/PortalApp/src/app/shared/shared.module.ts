import { NgModule } from '@angular/core';
import { CaptureImageComponent } from './capture-image/capture-image.component';

import { CommonModule } from '@angular/common';
import { PatientListitemComponent } from '@app/shared/patient-listitem/patient-listitem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguredDatepickerModule } from './ConfiguredDatepickerModule';
import { DayViewComponent } from './calendar/day-view/day-view.component';
import { DateFnsModule } from 'ngx-date-fns';
import { MaterialModule } from './Material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ConfiguredDatepickerModule,
        ReactiveFormsModule,
        DateFnsModule.forRoot()
    ],
    exports: [
        CaptureImageComponent,
        PatientListitemComponent,
        DayViewComponent
    ],
    declarations: [
        CaptureImageComponent,
        PatientListitemComponent,
        DayViewComponent
    ],
    providers: [
    ]
})
export class SharedModule { }

export { CaptureImageComponent };
