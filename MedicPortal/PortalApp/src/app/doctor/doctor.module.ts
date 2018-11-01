import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorListitemComponent } from './doctor-listitem/doctor-listitem.component';
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
    DoctorListitemComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    DoctorMylistComponent,
  ],
  exports: [
    DoctorListitemComponent,
    DoctorListComponent,
    DoctorMylistComponent,
    DoctorDetailsComponent,
  ]
})
export class DoctorModule { }
export {
  Doctor,
  DoctorListComponent,
  DoctorListitemComponent,
  DoctorMylistComponent,
  DoctorDetailsComponent,
};
