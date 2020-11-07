import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustomHttpResponse } from 'src/app/common/custom-http-response';
import { Product } from 'src/app/common/product';
import { User } from 'src/app/common/user';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  // private titleSubject = new BehaviorSubject<string>('Users');
  // public titleAction$ = this.titleSubject.asObservable();
  public users: User[];
  public user: User;
  public refreshing: boolean;
  public selectedUser: User;
  public fileName: string;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  private currentUsername: string;
  //public fileStatus = new FileUploadStatus();

  // for products
  public product:Product;
  public products: Product[];
  public selectedProduct: Product;

  // for pagination
  currentCategoryId: number = 1;
  previousCategoryId: number = 1; 
  pageNumber: number = 1;
  pageSize: number = 6;
  totalElements: number = 0;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private productService: ProductService, private notificationService: NotificationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers(true);
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  // public changeTitle(title: string): void {
  //   this.titleSubject.next(title);
  // }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

    this.subscriptions.push(
      this.userService.getUser().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS,`Update Successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    ); 
  }

  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.clickButton('openUserInfo');
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  public saveNewUser(): void {
    this.clickButton('new-user-save');
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Something happened. Please try again.');
    }
  }

  public onAddNewUser(userForm: NgForm): void {
    const formData = this.userService.createUserFormData(null, userForm.value);
    console.log(userForm.value);
    this.subscriptions.push(
      this.userService.addUser(formData).subscribe(
        (response: User) => {
          this.clickButton('new-user-close');
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.userFirstName} ${response.userLastName} added successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
      );
  }

  public searchUsers(searchTerm: string): void {
    const results: User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.userFirstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.userFirstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          results.push(user);
      }
    }
    this.users = results;
  }

  public onEditUser(editUser: User): void {
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    this.clickButton('openUserEdit');
  }

  public onUpdateUser(): void {
    const formData = this.userService.createUserFormData(this.currentUsername, this.editUser);
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          this.clickButton('closeEditUserModalButton');
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.userFirstName} ${response.userLastName} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
      );
  }

  public onDeleteUder(id: number): void {
    this.subscriptions.push(
      this.userService.deleteUser(id).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(false);
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
    );
  }

  public onUpdateCurrentUser(user: User): void {
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    const formData = this.userService.createUserFormDataInfo(this.currentUsername, user);
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response);
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.userFirstName} ${response.userLastName} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
      );
  }

  public onLogOut(): void {
    this.authenticationService.logout();
    this.router.navigate(['/admin/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.GENERAL_MANAGER || this.getUserRole() === Role.MANAGER;
  }

  public get isManager(): boolean {
    return this.getUserRole() === Role.GENERAL_MANAGER;
  }


  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.userFirstName);
    formData.append('lastName', user.userLastName);
    formData.append('username', user.username);
    formData.append('email', user.userEmail);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('nonLocked', JSON.stringify(user.nonLocked));
    return formData;
  }









  // Products operations
  public getProducts(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.productService.getAllProducts().subscribe(
        (response: Product[]) => {
          this.productService.addProductsToLocalCache(response);
          this.products = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS,`Update Successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    ); 
  }

  //  for pagination


  listProducts() {
    this.productService.getProducAllPaginate(this.pageNumber - 1, 
                                               this.pageSize)
                                               .subscribe(this.processResult());
  }

  processResult() {
    return data => { 
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize:number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  } 

  public onSelectProduct(product: Product): void {
    this.selectedProduct = product;
    this.clickButton('openProductInfo');
  }

  public onEditProduct(editUser: User): void {
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    this.clickButton('openProductEdit');
  }

  public onDeleteProduct(id: number): void {
    this.subscriptions.push(
      this.productService.deleteProduct(id).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
    );
  }

  public onUpdateProduct(): void {
  }

  

  public updateProfileImage(): void {
    this.clickButton('profile-image-input');
  }





}
  

