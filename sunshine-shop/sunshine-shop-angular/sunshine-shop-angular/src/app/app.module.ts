import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './services/product.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './services/notification.service';
//import { FormsModule } from '@angular/forms';
import { ShopManagementModule } from "./shop-management/shop-management.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    LayoutModule,
    RoutesModule,
    BrowserModule,
    ShopManagementModule,
    HttpClientModule,
    //FormsModule,
    NgbModule,
    //ReactiveFormsModule,
    NotificationModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule],
  // muti create differtent instance of injector
  // every time request come the injector able run the auth,interceptor logic
  // already said injector in root, can be removed
  providers: [ProductService, AuthenticationService, NotificationService,AuthenticationGuard, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
