import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountPatientsComponent } from './account-patients/account-patients.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { AccountAppointmentsComponent } from './account-appointments/account-appointments.component';

const routes: Routes = [
    { path: 'login', component: AccountLoginComponent },
    { path: 'patients', component: AccountPatientsComponent },
    { path: 'registration', component: AccountRegistrationComponent },
    { path: 'manage', component: AccountRegistrationComponent },
    { path: 'appointments', component: AccountAppointmentsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
