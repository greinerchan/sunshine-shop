import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { CustomHttpResponse } from '../common/custom-http-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getUser(): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.httpClient.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.httpClient.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.httpClient.post<User>(`${this.host}/user/resetpassword`, formData);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.httpClient.post<User>(`${this.host}/user/updateProfileImage`, formData, {reportProgress: true, observe:'events'});
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.httpClient.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem(`users`, JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
      return null;
  }

  public createUserFormData(LoggedInUsername: string, user: User): FormData {
    const formData = new FormData();
    formData.append('currentUsername', LoggedInUsername);
    formData.append('userFirstName', user.userFirstName);
    formData.append('userLastName', user.userLastName);
    formData.append('username', user.username);
    formData.append('userEmail', user.userEmail);
    formData.append('role', user.role);
    formData.append('active', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.isNonLocked));
    //formData.append('profileImage', profileImage);

    return formData
  }
  
}
