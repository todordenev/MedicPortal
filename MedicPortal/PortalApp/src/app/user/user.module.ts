import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AccountComponent
  ],
  exports: [
    RegistrationComponent
  ]
})
export class UserModule { }
export { RegistrationComponent, LoginComponent };