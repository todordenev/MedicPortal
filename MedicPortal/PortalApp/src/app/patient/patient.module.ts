import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListitemComponent } from './patient-listitem/patient-listitem.component';
import { MaterialModule } from '../shared/material.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    PatientListitemComponent,
    PatientListComponent,
    PatientListComponent
  ],
  exports: [
    PatientListitemComponent,
    PatientListComponent
  ]
})
export class PatientModule { }
export { Patient } from './patient';
export { PatientListitemComponent, PatientListComponent };
