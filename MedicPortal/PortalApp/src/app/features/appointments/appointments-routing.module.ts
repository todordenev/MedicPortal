import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  {
    path: 'new',
    component: CreateAppointmentComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'view/:id',
    component: AppointmentListComponent,
    canActivate: [AuthenticationGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
