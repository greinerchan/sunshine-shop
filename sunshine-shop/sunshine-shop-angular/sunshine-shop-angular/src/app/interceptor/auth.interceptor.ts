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

  constructor(authenticationService: AuthenticationService) {}

  // check
  authenticationService: AuthenticationService;

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.host}/user/login`)){
      return httpHandler.handle(httpRequest); // do nothing just let the request pass
    }

    if (httpRequest.url.includes(`${this.authenticationService.host}/user/register`)){
      return httpHandler.handle(httpRequest); // do nothing just let the request pass
    }

    if (httpRequest.url.includes(`${this.authenticationService.host}/user/resetpassword`)){
      return httpHandler.handle(httpRequest); // do nothing just let the request pass
    }

    // get token from local storage
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
    return httpHandler.handle(request);
  }
}
