import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images/images.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material';
import { CoreModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,

    SharedModule,
    CoreModule,
    
    MatButtonModule,

  ],
  declarations: [ImagesComponent]
})
export class AdminModule { }
