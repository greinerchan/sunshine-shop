import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';

// import { LayoutRoutingModule } from './layout-routing-ab.module';


@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    //LayoutRoutingModule
  ],
  exports: [
    RouterModule,
    HomeComponent
  ]
})
export class LayoutModule { }
