import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthenticationGuard } from './core/authentication-guard';
import { AccountRegistrationComponent } from './features/account/account-registration/account-registration.component';
import { FeaturesModule } from './features/features.module';
import { DoctorListComponent } from './features/doctor-search';
import { DoctorDetailsComponent } from './features/appointments';
import { NewAppointmentComponent } from './features/appointments';
import { AccountPatientsComponent } from './features/account/account-patients/account-patients.component';
import { AccountDoctorComponent } from './features/account/account-doctor/account-doctor.component';

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctors/:id', component: DoctorDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [AuthenticationGuard] },
  { path: 'register', component: AccountRegistrationComponent },
  { path: 'account-manage', component: AccountRegistrationComponent, canActivate: [AuthenticationGuard] },
  { path: 'account-patients', component: AccountPatientsComponent, canActivate: [AuthenticationGuard] },
   { path: 'account-doctors', component: AccountDoctorComponent, canActivate: [AuthenticationGuard] },
  { path: 'new-appointment', component: NewAppointmentComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FeaturesModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
