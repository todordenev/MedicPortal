import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { UserModule} from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { NavigationModule } from './navigation/navigation.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationGuard } from './routing/authentication-guard';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './routing/lower-case-url-serializer';


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
    UserModule,
    MatIconModule,
    MatSidenavModule,
    HttpClientModule,
    NavigationModule
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
