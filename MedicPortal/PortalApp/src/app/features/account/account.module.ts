import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/core/Material.module';
import { DateFnsModule } from 'ngx-date-fns';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { AccountPatientsComponent } from './account-patients/account-patients.component';
import { AccountAppointmentsComponent } from './account-appointments/account-appointments.component';
import { AccountDoctorComponent } from './account-doctor/account-doctor.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountManageComponent } from './account-manage/account-manage.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        DateFnsModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountPatientsComponent,
        AccountRegistrationComponent,
        AccountAppointmentsComponent,
        AccountDoctorComponent,
        AccountLoginComponent,
        AccountManageComponent
    ],
    exports: [
        AccountPatientsComponent,
        AccountRegistrationComponent,
        AccountDoctorComponent,
        AccountAppointmentsComponent,
        AccountLoginComponent
    ]
})
export class AccountModule { }
