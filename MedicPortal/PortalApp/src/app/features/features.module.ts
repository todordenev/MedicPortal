import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/core/Material.module';
import { DateFnsModule } from 'ngx-date-fns';
import { AccountModule } from './account/account.module';
import { DoctorSearchModule } from './doctor-search/doctor-search.module';
import { PatientModule } from './patient';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    DateFnsModule.forRoot(),
    AccountModule,
    DoctorSearchModule,
    PatientModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FeaturesModule { }
