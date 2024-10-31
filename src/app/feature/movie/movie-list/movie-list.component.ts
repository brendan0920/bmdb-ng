import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  title: string = "Movie-List!";

  movies: Movie[] | undefined;
  subscription!: Subscription;

  constructor(private movieSvc: MovieService) { }

  ngOnInit(): void {
    // this.movies = [
    //   new Movie(1, "The Dark Knight", 2008, "PG-13", "Christopher Nolan"),
    //   new Movie(2, "Joker", 2019, "R", "Todd Phillips"),
    //   new Movie(3, "The Notebook", 2004, "PG-13", "Nick Cassavetes"),
    //   new Movie(4, "Good Will Hunting", 1997, "R", "Gus Van Sant"),
    //   new Movie(5, "Unbroken", 2014, "PG-13", "Angelina Jolie")
    // ];
    this.subscription = this.movieSvc.list().subscribe(
      (resp) => {
        this.movies = resp;
      }
    );
  }

  // addMovie(): void {
  //   this.movies?.push(this.newMovie);
  //   this.newMovie = new Movie();
  // }

  delete(index: number): void {
    this.movies?.splice(index, 1);
  }

}
