import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ManageAppointmentsComponent,
    ManagePatientsComponent
  ],
  exports: [
    ManageAppointmentsComponent
  ]
})
export class DoctorModule { }
