import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { Doctor } from '../shared/doctor';
import { DoctorMylistComponent } from './doctor-mylist/doctor-mylist.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    DoctorDetailsComponent,
    DoctorMylistComponent,
  ],
  exports: [
    DoctorMylistComponent,
    DoctorDetailsComponent,
  ]
})
export class DoctorModule { }
export {
  Doctor,
  DoctorMylistComponent,
  DoctorDetailsComponent,
};
