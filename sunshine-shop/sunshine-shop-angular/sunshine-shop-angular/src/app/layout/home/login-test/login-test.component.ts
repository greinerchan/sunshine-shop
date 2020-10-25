import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.css']
})
export class LoginTestComponent implements OnInit {


  ngOnInit(): void {
  }
  title = 'Demo';
  greeting = {};

  constructor(private userService: UserService, private httpClient: HttpClient) {
    httpClient.get('resource').subscribe(data => this.greeting = data);
  }

  authenticated() { return this.userService.authenticated; }
}
