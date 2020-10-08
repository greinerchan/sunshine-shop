import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SubImagesComponent } from './home/sub-images/sub-images.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecommendsComponent } from './home/recommends/recommends.component'; 


// import { LayoutRoutingModule } from './layout-routing-ab.module';


@NgModule({
  declarations: [HeaderComponent, HomeComponent, CarouselComponent, SubImagesComponent, RecommendsComponent],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
    //LayoutRoutingModule
  ],
  exports: [
    RouterModule,
    HomeComponent
  ]
})
export class LayoutModule { }
