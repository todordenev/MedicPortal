import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/core/Material.module';
import { DateFnsModule } from 'ngx-date-fns';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { PatientDoctorAppointmentsComponent } from './patient-doctor-appointments/patient-doctor-appointments.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DateFnsModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    PatientDoctorAppointmentsComponent,
    CreateAppointmentComponent
  ],
  exports: [
    PatientDoctorAppointmentsComponent,
    CreateAppointmentComponent
  ]
})
export class PatientModule { }
