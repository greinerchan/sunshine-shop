import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CheckoutformService {

  private countryUrl = "http://localhost:8080/sunshine/countries";
  private stateUrl = "http://localhost:8080/sunshine/states";
  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetReponseCountries>(this.countryUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(name: string): Observable<State[]> {
    const searchStateUrl = `${this.stateUrl}/search/findByCountryName?name=${name}`;
    return this.httpClient.get<GetReponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    );
  }

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

interface GetReponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetReponseStates {
  _embedded: {
    states: State[];
  }
}
