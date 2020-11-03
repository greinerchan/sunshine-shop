import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/user';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  constructor(private router:Router, private authenticationService: AuthenticationService, private notificationService:NotificationService ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
  }

  ngOnInit(): void {

  }
  
  public onResgister(user:User): void {
    this.subscriptions.push(this.authenticationService.register(user).subscribe(
      (response: User) => {
        this.sendNotification(NotificationType.SUCCESS,`Congrats, you have created a new account for:  ${response.userEmail}. Please login to your mail box to retrieve your password`);

      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      }
    )
    );
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Something wrong happened. Please try again.');
    }
  }

}
