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

// new card pakage
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FooterComponent } from './home/footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, HomeComponent, CarouselComponent, SubImagesComponent, RecommendsComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule
    // LayoutRoutingModule
  ],
  exports: [
    RouterModule,
    HomeComponent
  ]
})
export class LayoutModule { }
