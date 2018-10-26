import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { MaterialModule } from '../shared/material.module';
import { PatientModule } from '../patient/patient.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PatientModule

  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AccountComponent
  ],
  exports: [
    RegistrationComponent,
    LoginComponent
  ]
})
export class UserModule { }
export { RegistrationComponent, LoginComponent };
