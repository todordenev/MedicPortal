import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorRegistrationCodesComponent } from './doctor-registration-codes/doctor-registration-codes.component';

const routes: Routes = [
  { path: 'appointments', component: DoctorAppointmentsComponent },
  { path: 'patients', component: DoctorPatientsComponent },
  { path: 'registration-codes', component: DoctorRegistrationCodesComponent },
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
