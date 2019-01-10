import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule, BrowserAnimationsModule, FormsModule, CalendarModule

  ],
  declarations: [
    DoctorAppointmentsComponent,
    DoctorPatientsComponent
  ],
  exports: [
    DoctorAppointmentsComponent,
  ]
})
export class DoctorModule { }
