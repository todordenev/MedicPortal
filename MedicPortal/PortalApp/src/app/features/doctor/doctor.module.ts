import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { DoctorAppointmentsListComponent } from './doctor-appointments-list/doctor-appointments-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { DateFnsModule } from 'ngx-date-fns';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorRegistrationCodesComponent } from './doctor-registration-codes/doctor-registration-codes.component';
import { MatIconModule, MatDatepickerModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    TabViewModule,
    DateFnsModule,
    SharedModule,
    FlexLayoutModule,
    DoctorRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    DoctorAppointmentsComponent,
    DoctorPatientsComponent,
    DoctorAppointmentsListComponent,
    DoctorRegistrationCodesComponent
  ],
  exports: [
    DoctorAppointmentsComponent,
  ]
})
export class DoctorModule { }
