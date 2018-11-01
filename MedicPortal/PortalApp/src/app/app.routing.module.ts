import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent, DoctorDetailsComponent, DoctorMylistComponent } from './doctor/doctor.module';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './core/role-guard';
import { LoginComponent } from './features/login/login.component';
import { AuthenticationGuard } from './core/authentication-guard';
import { RegistrationComponent } from './features/registration/registration.component';
import { AccountComponent } from './features/account/account.component';
import { FeaturesModule } from './features/features.module';


const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctors', component: DoctorListComponent, canActivate: [AuthenticationGuard] },
  { path: 'doctors/:id', component: DoctorDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [AuthenticationGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'manage', component: AccountComponent, canActivate: [AuthenticationGuard] },
  { path: 'mydoctors', component: DoctorMylistComponent, canActivate: [AuthenticationGuard] },
  { path: 'mypatients', component: DoctorMylistComponent, canActivate: [AuthenticationGuard] },
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
