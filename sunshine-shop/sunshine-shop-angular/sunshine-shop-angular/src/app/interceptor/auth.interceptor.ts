import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService) {}



  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.host}/admin/login`)){
      return httpHandler.handle(httpRequest); // do nothing just let the request pass
    }

    if (httpRequest.url.includes(`${this.authenticationService.host}/admin/register`)){
      return httpHandler.handle(httpRequest); // do nothing just let the request pass
    }

    if (httpRequest.url.includes(`${this.authenticationService.host}/admin/forgetpassword`)){
      return httpHandler.handle(httpRequest); // do nothing just let the request pass
    }

    if (httpRequest.url.includes(`${this.authenticationService.host}/sunshine`)){
      return httpHandler.handle(httpRequest); // do nothing just let the request pass
    }

    // get token from local storage
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
    return httpHandler.handle(request);
  }
}
