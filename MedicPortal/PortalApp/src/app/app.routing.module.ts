import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorPatientsComponent } from './features/doctor';
import { RoleGuard, AuthenticationGuard } from './core';

const routes: Routes = [
  { path: 'account', loadChildren: './features/account/account.module#AccountModule' },
  { path: 'doctors', loadChildren: './features/doctors/doctors.module#DoctorsModule' },
  {
    path: 'doctor',
    loadChildren: './features/doctor/doctor.module#DoctorModule',
    canActivateChild: [AuthenticationGuard, RoleGuard],
    data: { roles: ['Doctor', 'Admin'] }
  },
  {
    path: 'appointments',
    loadChildren: './features/appointments/appointments.module#AppointmentsModule'
  },
  {
    path: '',
    redirectTo: 'doctors',
    pathMatch: 'full'
  },
  // {
  //   path: 'doctor-newpatient-code',
  //   component: DoctorNewpatientCodeComponent,
  //   canActivate: [AuthenticationGuard, RoleGuard],
  //   data: { roles: ['Doctor', 'Admin'] }
  // },
  { path: 'doctor-patients', component: DoctorPatientsComponent, canActivate: [AuthenticationGuard, RoleGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
