import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './navbar/sign-up/sign-up.component';
import { LoginComponent } from './navbar/login/login.component';
import { CartComponent } from './navbar/cart/cart.component';
import { CategoryComponent } from './navbar/category/category.component';
import { LayoutModule } from '../layout/layout.module';
import {OnlineOnlyComponent} from "./navbar/online-only/online-only.component";
import {BackhomeComponent} from "./navbar/backhome/backhome.component";
import { OnSaleComponent } from "./navbar/on-sale/on-sale.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SignUpComponent, LoginComponent, CartComponent, CategoryComponent, BackhomeComponent, OnlineOnlyComponent, OnSaleComponent],
  imports: [
    CommonModule,
    LayoutModule,
    NgbModule,
    MDBBootstrapModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class RoutesModule { }
