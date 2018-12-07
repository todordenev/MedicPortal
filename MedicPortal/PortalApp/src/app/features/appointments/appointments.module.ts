import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { MaterialModule } from '@app/shared/Material.module';
import { DateFnsModule } from 'ngx-date-fns';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    DoctorDetailsComponent,
    NewAppointmentComponent
  ],
  exports: [
    NewAppointmentComponent,
    DoctorDetailsComponent
  ]
})
export class AppointmentsModule { }
