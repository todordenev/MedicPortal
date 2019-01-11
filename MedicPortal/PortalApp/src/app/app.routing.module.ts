import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/authentication-guard';
import { AccountRegistrationComponent } from './features/account';
import { FeaturesModule } from './features/features.module';
import { DoctorListComponent } from './features/doctor-search';
import { PatientDoctorAppointmentsComponent, CreateAppointmentComponent } from './features/patient';
import { AccountPatientsComponent } from './features/account/account-patients/account-patients.component';
import { AccountDoctorComponent } from './features/account/account-doctor/account-doctor.component';
import { AccountAppointmentsComponent } from './features/account';
import { AccountLoginComponent } from './features/account/account-login/account-login.component';
import { DoctorAppointmentsComponent } from './features/doctor';
import { DoctorPatientsComponent } from './features/doctor';
import { RoleGuard } from './core/role-guard';

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctors/:id', component: PatientDoctorAppointmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: AccountLoginComponent },
  { path: 'logout', component: AccountLoginComponent, canActivate: [AuthenticationGuard] },
  { path: 'register', component: AccountRegistrationComponent },
  { path: 'account-manage', component: AccountRegistrationComponent, canActivate: [AuthenticationGuard] },
  { path: 'account-patients', component: AccountPatientsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account-doctors', component: AccountDoctorComponent, canActivate: [AuthenticationGuard] },
  { path: 'account-appointments', component: AccountAppointmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'new-appointment', component: CreateAppointmentComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'doctor-appointments',
    component: DoctorAppointmentsComponent,
    canActivate: [AuthenticationGuard, RoleGuard],
    data: { roles: ['Doctor', 'Admin'] }
  },
  { path: 'doctor-patients', component: DoctorPatientsComponent, canActivate: [AuthenticationGuard, RoleGuard] }
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
