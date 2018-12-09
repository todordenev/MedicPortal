import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountViewComponent } from '@app/features/account/account-view/account-view.component';
import { AccountPatientsComponent } from '@app/features/account/account-patients/account-patients.component';

import { MaterialModule } from '@app/core/Material.module';
import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        DateFnsModule
    ],
    declarations: [
        AccountViewComponent,
        AccountPatientsComponent,
        AccountRegistrationComponent
    ],
    exports: [
        AccountViewComponent,
        AccountPatientsComponent,
        AccountRegistrationComponent
    ]
})
export class AccountModule { }
