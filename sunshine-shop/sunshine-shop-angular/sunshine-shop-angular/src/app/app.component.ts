import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { event } from 'jquery';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // constructor(private location: Location) {}
  // currentRoute = this.location.path();
  title = "sunshine-shop-angular"
  
  path:string;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.path = event.url;
      }
      else if (event instanceof NavigationEnd) {
        // if u dont need the state, you could even use this event-type..
      }
    });
  }

  
}

