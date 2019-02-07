import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorListitemComponent } from './doctor-listitem/doctor-listitem.component';
import { MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DoctorsRoutingModule,
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule
    ],
    declarations: [
        DoctorListComponent,
        DoctorListitemComponent]
})
export class DoctorsModule { }
