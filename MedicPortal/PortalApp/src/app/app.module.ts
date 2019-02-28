import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './shared/lower-case-url-serializer';
import { AuthenticationGuard } from './core/guards/authentication-guard';
import { SharedModule } from './shared/shared.module';
import { DateAdapter, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { CustomDateAdapter } from './shared/CustomDateAdapter';
import { ConfiguredDatepickerModule } from './shared/ConfiguredDatepickerModule';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import * as bgLocale from 'date-fns/locale/bg/index.js';
import { DoctorModule } from './features/doctor';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RoleGuard } from './core';
import { MessageService } from 'primeng/components/common/messageservice';
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
    MatToolbarModule,
    SidebarModule,
    ToolbarModule,
    SplitButtonModule,
    OverlayPanelModule
  ],
  providers: [
      MessageService,
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
