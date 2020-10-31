import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/user';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  constructor(private router:Router, private authenticationService: AuthenticationService, private notificationService:NotificationService ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/admin/management');
    } else {
      this.router.navigateByUrl('/admin/login');
    }
  }
  
  public onLogin(user:User): void {
    console.log(user);
    this.subscriptions.push(this.authenticationService.login(user).subscribe(
      (response: HttpResponse<User>) => {
        const token = response.headers.get(HeaderType.JWT_TOKEN);
        this.authenticationService.saveToken(token);
        this.authenticationService.addUserToLocalCache(response.body);
        this.router.navigateByUrl('/admin/management');
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        this.sendErrorNotification(NotificationType.ERROR,errorResponse.error.mesagge);
      }
    )
    );
  }
  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'AN ERROR OCCURED. PLEASE TRY AGAIN');
    }
  }
}
