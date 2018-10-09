import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent, DoctorListitemComponent, DoctorDetailsComponent } from './doctor/doctor.module';
import { RegistrationComponent, LoginComponent } from './user/user.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctor/:id', component: DoctorDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
