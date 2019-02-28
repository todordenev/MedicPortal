import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { MatCardModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DateFnsModule } from 'ngx-date-fns';
import { SharedModule } from '@app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppointmentsRoutingModule,
        MatIconModule,
        MatDatepickerModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        DateFnsModule,
        SharedModule,
        FlexLayoutModule,
        ToastModule
    ],
    declarations: [
        AppointmentListComponent,
        CreateAppointmentComponent]
})
export class AppointmentsModule { }
