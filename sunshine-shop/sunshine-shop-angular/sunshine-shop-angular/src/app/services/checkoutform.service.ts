import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutformService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let monthArr: number[] = [];

    for (let month = startMonth; month <=12; month++) {
      monthArr.push(month);
    }

    //of wrap an object as obserable
    return of(monthArr);
  }

  getCreditCardYears(): Observable<number[]> {

    let yearArr: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 20;

    for (let year = startYear; year <= endYear; year++) {
      yearArr.push(year);
    }
    return of(yearArr);
  }

}
