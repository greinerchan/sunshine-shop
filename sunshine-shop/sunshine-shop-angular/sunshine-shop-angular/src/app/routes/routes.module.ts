import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './navbar/sign-up/sign-up.component';
import { LoginComponent } from './navbar/login/login.component';
import { CartComponent } from './navbar/cart/cart.component';


@NgModule({
  declarations: [SignUpComponent, LoginComponent, CartComponent],
  imports: [
    CommonModule
  ]
})
export class RoutesModule { }
