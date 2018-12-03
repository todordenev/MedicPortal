import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthenticationGuard } from './core/authentication-guard';
import { RegistrationComponent } from './features/registration/registration.component';
import { FeaturesModule } from './features/features.module';
import { DoctorListComponent } from './features/doctor-list/doctor-list.component';
import { AccountViewComponent } from '@app/features/account/account-view/account-view.component';
import { DoctorDetailsComponent } from './features/doctor-details/doctor-details.component';
import { NewAppointmentComponent } from './features/new-appointment/new-appointment.component';
import { AccountDoctorComponent } from './features/account/account-doctor/account-doctor.component';
import { RoleGuard } from './core/role-guard';

const routes: Routes = [
    { path: '', component: DoctorListComponent },
    { path: 'doctors/:id', component: DoctorDetailsComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent, canActivate: [AuthenticationGuard] },
    { path: 'register', component: RegistrationComponent },
    { path: 'manage', component: AccountViewComponent, canActivate: [AuthenticationGuard] },
    { path: 'new-appointment', component: NewAppointmentComponent, canActivate: [AuthenticationGuard] },
    { path: 'mydoctor/:id', component: AccountDoctorComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { role: ['doctor', 'doctor-manager'] } }
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
