import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/core/Material.module';
import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';
import { AccountModule } from './account/account.module';
import { DoctorSearchModule } from './doctor-search/doctor-search.module';
import { AppointmentsModule } from './appointments/appointments.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    DateFnsModule.forRoot(),
    AccountModule,
    DoctorSearchModule,
    AppointmentsModule
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ]
})
export class FeaturesModule { }
