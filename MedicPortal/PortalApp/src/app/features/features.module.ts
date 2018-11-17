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
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { registerLocaleData } from '@angular/common';
import localeBg from '@angular/common/locales/bg';
registerLocaleData(localeBg);

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
    DoctorDetailsComponent,
    AccountPatientsComponent
  ],
  exports: [
    RegistrationComponent,
    LoginComponent,
    AccountViewComponent,
    PatientListComponent,
    DoctorListComponent,
    DoctorListitemComponent,
    DoctorDetailsComponent
  ]
})
export class FeaturesModule { }
