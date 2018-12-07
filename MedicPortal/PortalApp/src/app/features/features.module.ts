import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';
import { RouterModule } from '@angular/router';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { MaterialModule } from '@app/shared/Material.module';
import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AccountModule } from './account/account.module';
import { DoctorSearchModule } from './doctor-search/doctor-search.module';

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
    DoctorSearchModule
  ],
  declarations: [
    LoginComponent,
    PatientListComponent,
    DoctorDetailsComponent,
    NewAppointmentComponent
  ],
  exports: [
    LoginComponent,
    PatientListComponent,
    DoctorDetailsComponent
  ]
})
export class FeaturesModule { }
