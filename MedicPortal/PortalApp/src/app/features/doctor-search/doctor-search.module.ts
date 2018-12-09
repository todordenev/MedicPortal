import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorListitemComponent } from './doctor-listitem/doctor-listitem.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/core/Material.module';
import { DateFnsModule } from 'ngx-date-fns';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DateFnsModule,
    SharedModule
  ],
  declarations: [
    DoctorListComponent,
    DoctorListitemComponent
  ],
  exports: [
    DoctorListComponent,
    DoctorListitemComponent
  ]
})
export class DoctorSearchModule { }
