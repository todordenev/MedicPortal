import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent, DoctorListitemComponent, DoctorDetailsComponent, DoctorEditComponent } from '../doctor/doctor.module';
import { RegistrationComponent, LoginComponent } from '../user/user.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication-guard';
import { RoleGuard } from './role-guard';
import { AccountComponent } from '../user/account/account.component';


const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctors', component: DoctorListComponent, canActivate: [AuthenticationGuard] },
  { path: 'doctor/:id', component: DoctorDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [AuthenticationGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'manage', component: RegistrationComponent },
  {
    path: 'doctor-edit/:id', component: DoctorEditComponent, canActivate: [AuthenticationGuard, RoleGuard],
    data: { role: 'doctor-manager' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
