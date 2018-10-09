import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { DoctorListComponent } from "./doctor-list/doctor-list.component";
import { DoctorListitemComponent } from "./doctor-listitem/doctor-listitem.component";
import { RouterModule } from "@angular/router";
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component'

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
    DoctorDetailsComponent
  ],
  exports: [
    DoctorListitemComponent,
    DoctorListComponent,
    DoctorDetailsComponent
  ]
})
export class DoctorModule { };
export { Doctor } from './Doctor';
export { DoctorListComponent } from "./doctor-list/doctor-list.component";
export { DoctorListitemComponent } from "./doctor-listitem/doctor-listitem.component";
export { DoctorDetailsComponent };
