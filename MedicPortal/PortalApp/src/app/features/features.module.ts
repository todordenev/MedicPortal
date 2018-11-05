import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientListitemComponent } from './patient-listitem/patient-listitem.component';
import { PatientMylistComponent } from './patient-mylist/patient-mylist.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorListitemComponent } from './doctor-listitem/doctor-listitem.component';
import { RouterModule } from '@angular/router';


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
    AccountComponent,
    PatientListComponent,
    PatientListitemComponent,
    PatientMylistComponent,
    DoctorListComponent,
    DoctorListitemComponent
  ],
  exports: [
    RegistrationComponent,
    LoginComponent,
    AccountComponent,
    PatientListComponent,
    PatientListitemComponent,
    PatientMylistComponent,
    DoctorListComponent,
    DoctorListitemComponent
  ]
})
export class FeaturesModule { }
