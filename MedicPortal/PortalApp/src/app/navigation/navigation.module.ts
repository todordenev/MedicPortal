import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatToolbarModule, MatButtonModule,MatSidenavModule, MatNavList, MatListModule, MatMenuModule } from '@angular/material';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule
  ],
  declarations: [
    TopNavComponent,
    SideNavComponent
  ],
  exports: [
    TopNavComponent,
    SideNavComponent
  ]
})
export class NavigationModule { }
export { TopNavComponent } from './top-nav/top-nav.component';
export { SideNavComponent } from './side-nav/side-nav.component';
