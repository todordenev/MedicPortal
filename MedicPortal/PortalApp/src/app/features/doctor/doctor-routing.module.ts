import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { AuthenticationGuard, RoleGuard } from '@app/core';

const routes: Routes = [
  {
    path: 'appointments',
    component: DoctorAppointmentsComponent,
    canActivate: [AuthenticationGuard, RoleGuard],
    data: { roles: ['Doctor', 'Admin'] }
  },
  { path: 'patients', component: DoctorAppointmentsComponent },
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
