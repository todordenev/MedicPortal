import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorListitemComponent } from './doctor-listitem/doctor-listitem.component';
import { RouterModule } from '@angular/router';
import { AccountViewComponent } from '@app/features/account/account-view/account-view.component';
import { AccountPatientsComponent } from '@app/features/account/account-patients/account-patients.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    AccountViewComponent,
    PatientListComponent,
    DoctorListComponent,
    DoctorListitemComponent,
    AccountPatientsComponent
  ],
  exports: [
    RegistrationComponent,
    LoginComponent,
    AccountViewComponent,
    PatientListComponent,
    DoctorListComponent,
    DoctorListitemComponent
  ]
})
export class FeaturesModule { }
