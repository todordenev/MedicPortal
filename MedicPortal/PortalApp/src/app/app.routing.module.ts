import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/authentication-guard';
import { AccountRegistrationComponent } from './features/account';
import { FeaturesModule } from './features/features.module';
import { DoctorListComponent } from './features/doctor-search';
import { DoctorDetailsComponent } from './features/appointments';
import { NewAppointmentComponent } from './features/appointments';
import { AccountPatientsComponent } from './features/account/account-patients/account-patients.component';
import { AccountDoctorComponent } from './features/account/account-doctor/account-doctor.component';
import { AccountAppointmentsComponent } from './features/account';
import { AccountLoginComponent } from './features/account/account-login/account-login.component';
import { ManageAppointmentsComponent } from './features/doctor';
import { ManagePatientsComponent } from './features/doctor/manage-patients/manage-patients.component';
import { RoleGuard } from './core/role-guard';

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctors/:id', component: DoctorDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: AccountLoginComponent },
  { path: 'logout', component: AccountLoginComponent, canActivate: [AuthenticationGuard] },
  { path: 'register', component: AccountRegistrationComponent },
  { path: 'account-manage', component: AccountRegistrationComponent, canActivate: [AuthenticationGuard] },
  { path: 'account-patients', component: AccountPatientsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account-doctors', component: AccountDoctorComponent, canActivate: [AuthenticationGuard] },
  { path: 'account-appointments', component: AccountAppointmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'new-appointment', component: NewAppointmentComponent, canActivate: [AuthenticationGuard] },
  { path: 'doctor-accounts', component: ManageAppointmentsComponent, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'doctor-patients', component: ManagePatientsComponent, canActivate: [AuthenticationGuard, RoleGuard] }
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
