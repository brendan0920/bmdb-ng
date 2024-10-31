import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../model/actor';

const URL = "http://localhost:5091/api/Actors";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  list(): Observable<Actor[]> {
    return this.http.get(URL) as Observable<Actor[]>;
  }
}
