import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from 'primeng/tabview';
import { DoctorAppointmentsListComponent } from './doctor-appointments-list/doctor-appointments-list.component';
import { MaterialModule } from '@app/core/Material.module';
import { SharedModule } from '@app/shared/shared.module';
import { DateFnsModule } from 'ngx-date-fns';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    TabViewModule,
    MaterialModule,
    DateFnsModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    DoctorAppointmentsComponent,
    DoctorPatientsComponent,
    DoctorAppointmentsListComponent
  ],
  exports: [
    DoctorAppointmentsComponent,
  ]
})
export class DoctorModule { }
