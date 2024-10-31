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
}
