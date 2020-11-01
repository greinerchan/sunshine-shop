import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, RouterLink } from '@angular/router';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { AuthenticationGuard } from '../guard/authentication.guard';
import { UserService } from '../services/user.service';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { RoutesModule } from '../routes/routes.module';
import { NotificationModule } from '../notification.module';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserForgotComponent } from './user-forgot/user-forgot.component';

@NgModule({
  declarations: [LoginAdminComponent, RegisterAdminComponent, UserAdminComponent, UserForgotComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutesModule,
    NotificationModule,
    RouterModule
  ],
  providers: [AuthenticationService, NotificationService,AuthenticationGuard, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [LoginAdminComponent]
})
export class ShopManagementModule { }
