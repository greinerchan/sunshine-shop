import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';



// import { LayoutRoutingModule } from './layout-routing-ab.module';


@NgModule({
  declarations: [HeaderComponent, HomeComponent, CarouselComponent],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule
    //LayoutRoutingModule
  ],
  exports: [
    RouterModule,
    HomeComponent
  ]
})
export class LayoutModule { }
