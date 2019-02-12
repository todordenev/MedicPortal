import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountPatientsComponent } from './account-patients/account-patients.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { AccountAppointmentsComponent } from './account-appointments/account-appointments.component';
import { AuthenticationGuard } from '@app/core';
import { AccountManageComponent } from './account-manage/account-manage.component';

const routes: Routes = [
    { path: 'login', component: AccountLoginComponent },
    { path: 'registration', component: AccountRegistrationComponent },
    { path: 'patients', component: AccountPatientsComponent, canActivate: [AuthenticationGuard] },
    { path: 'manage', component: AccountManageComponent, canActivate: [AuthenticationGuard] },
    { path: 'appointments', component: AccountAppointmentsComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
