import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './shared/lower-case-url-serializer';
import { RoleGuard } from './core/role-guard';
import { AuthenticationGuard } from './core/authentication-guard';
import { SharedModule } from './shared/shared.module';
import { DateAdapter, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { CustomDateAdapter } from './shared/CustomDateAdapter';
import { MaterialModule } from './core/Material.module';
import { ConfiguredDatepickerModule } from './shared/ConfiguredDatepickerModule';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import * as bgLocale from 'date-fns/locale/bg/index.js';
import { DoctorModule } from './features/doctor';
import { CalendarModule } from 'primeng/calendar';
const dnsConfigService = new DateFnsConfigurationService();
dnsConfigService.setLocale(bgLocale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    DoctorModule,
    ConfiguredDatepickerModule,
    DateFnsModule.forRoot(),
    FlexLayoutModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    RoleGuard,
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: DateFnsConfigurationService, useValue: dnsConfigService } // <-- All pipies in bg by default

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
