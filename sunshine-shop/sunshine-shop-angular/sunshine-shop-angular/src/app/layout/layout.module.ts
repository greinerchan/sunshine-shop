import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { FooterComponent } from './home/footer/footer.component';
import { SubImagesComponent } from './home/sub-images/sub-images.component';
import { RecommendsComponent } from './home/recommends/recommends.component'; 
import { HeaderAsstComponent } from './home/header-asst/header-asst.component';
import { ProductListComponent } from './home/product-list/product-list.component';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




// new card pakage
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SubProductListComponent } from './home/sub-product-list/sub-product-list.component';
import { ProductDetailComponent } from './home/product-detail/product-detail.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";





@NgModule({
  declarations: [HeaderComponent, HomeComponent, CarouselComponent, SubImagesComponent, RecommendsComponent, FooterComponent, ProductListComponent, HeaderAsstComponent, SubProductListComponent, ProductDetailComponent],
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
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule
    // LayoutRoutingModule
  ],
  exports: [
    RouterModule,
    HomeComponent,
    HeaderComponent, HomeComponent, CarouselComponent, SubImagesComponent, RecommendsComponent, FooterComponent, ProductListComponent, HeaderAsstComponent
  ]
})
export class LayoutModule { 
}
