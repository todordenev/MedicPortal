import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DoctorAppointmentsComponent,
    DoctorPatientsComponent
  ],
  exports: [
    DoctorAppointmentsComponent
  ]
})
export class DoctorModule { }
