import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/user-login';

const URL = "http://localhost:5091/api/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // getById(id: number) method
  login(userLogin: UserLogin): Observable<User> {
    return this.http.post(URL + "/login", userLogin) as Observable<User>;
  }
}
