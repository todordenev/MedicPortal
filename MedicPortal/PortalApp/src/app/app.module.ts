import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DoctorModule } from './doctor/doctor.module';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './shared/lower-case-url-serializer';
import { RoleGuard } from './core/role-guard';
import { AuthenticationGuard } from './core/authentication-guard';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';

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
    HttpClientModule,
    SharedModule,
    FeaturesModule
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
