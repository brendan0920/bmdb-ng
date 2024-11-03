import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { Observable } from 'rxjs';

const URL = "http://localhost:5091/api/Movies";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  list(): Observable<Movie[]> {
    return this.http.get(URL) as Observable<Movie[]>;
  }

  // add(movie: Movie) method
  add(movie: Movie): Observable<Movie> {
    return this.http.post(URL, movie) as Observable<Movie>;
  }

  // delete(id: number) method
  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id);
  }

  // getById(id: number) method
  getById(id: number): Observable<Movie> {
    return this.http.get(URL + "/" + id) as Observable<Movie>;
  }


  // edit(movie: Movie) method
  edit(movie: Movie): Observable<Movie> {
    return this.http.put(URL + '/' + movie.id, movie) as Observable<Movie>;
  }


}
