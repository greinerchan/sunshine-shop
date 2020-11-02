import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/user';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { CustomHttpResponse } from 'src/app/common/custom-http-response';

@Component({
  selector: 'app-user-forgot',
  templateUrl: './user-forgot.component.html',
  styleUrls: ['./user-forgot.component.css']
})
export class UserForgotComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  constructor(private router:Router, private authenticationService: AuthenticationService, private notificationService:NotificationService, private userService: UserService ) { }

  public refreshing: boolean;

  private currentUsername: string;

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
  }
  
  // public onForget(user:User): void {
  //   this.subscriptions.push(this.userService.forgetPassword(user).subscribe(
  //     (response: User) => {
  //       this.sendNotification(NotificationType.SUCCESS,`Congrats, you have reset your account for:  ${response.userEmail}. Please login to your mail box to retrieve your password`);

  //     },
  //     (errorResponse: HttpErrorResponse) => {
  //       console.log(errorResponse);
  //       this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
  //     }
  //   )
  //   );
  // }

  public onResetPassword(emailForm: NgForm): void {
    this.refreshing = true;
    const emailAddress = emailForm.value['reset-password-email'];
    this.subscriptions.push(
      this.userService.forgetPassword(emailAddress).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
        },
        // finally
        () => emailForm.reset()
      )
    );
  }
  
  private sendNotification(notificationType: NotificationType, message: string): void {
    console.log(message);
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Something wrong happened. Please try again.');
    }
  }

}
