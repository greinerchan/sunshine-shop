import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';




import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { RoutesModule } from '../routes/routes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { AuthenticationGuard } from '../guard/authentication.guard';
import { NotificationModule } from '../notification.module';
import { NotificationService } from '../services/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RoutesModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NotificationModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule],
  providers: [ProductService, AuthenticationService, NotificationService,AuthenticationGuard, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  exports: [LoginComponent, RegisterComponent, UserComponent]
})
export class ManagementModule { }


