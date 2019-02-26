import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images/images.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { CoreModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,

    SharedModule,
    CoreModule,
    MatIconModule,
    MatButtonModule,

  ],
  declarations: [
    ImagesComponent
  ]
})
export class AdminModule { }
