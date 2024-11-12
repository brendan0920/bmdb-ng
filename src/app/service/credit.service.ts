import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credit } from '../model/credit';

const URL = "http://localhost:5091/api/Credits";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private http: HttpClient) { }

  list(): Observable<Credit[]> {
    return this.http.get(URL) as Observable<Credit[]>;
  }

  // add(credit: Credit) method
  add(credit: Credit): Observable<Credit> {
    return this.http.post(URL, credit) as Observable<Credit>;
  }

  // delete(id: number) method
  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id);
  }

  // getById(id: number) method
  getById(id: number): Observable<Credit> {
    return this.http.get(URL + "/" + id) as Observable<Credit>;
  }

  // edit(credit: Credit) method
  edit(credit: Credit): Observable<Credit> {
    return this.http.put(URL + '/' + credit.id, credit) as Observable<Credit>;
  }

  getByMovieId(movieId: number): Observable<Credit[]> {
    return this.http.get(URL + "/movie/" + movieId) as Observable<Credit[]>;
  }
}
