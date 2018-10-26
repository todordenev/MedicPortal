import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationGuard } from './routing/authentication-guard';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './routing/lower-case-url-serializer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleGuard } from './routing/role-guard';
import { PatientModule } from './patient/patient.module';
import { MatDatepickerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DoctorModule,
    PatientModule,
    UserModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    RoleGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
