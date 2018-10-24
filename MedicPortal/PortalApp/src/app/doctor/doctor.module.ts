import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorListitemComponent } from './doctor-listitem/doctor-listitem.component';
import { RouterModule } from '@angular/router';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { Doctor } from './Doctor';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  declarations: [
    DoctorListitemComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    DoctorRegistrationComponent,
    DoctorEditComponent
  ],
  exports: [
    DoctorListitemComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    DoctorRegistrationComponent
  ]
})
export class DoctorModule { }
export {
  Doctor,
  DoctorListComponent,
  DoctorListitemComponent,
  DoctorDetailsComponent,
  DoctorRegistrationComponent,
  DoctorEditComponent
};
