import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit, OnDestroy {
  title: string = "Movie Edit";
  movieId!: number;
  movie!: Movie;
  subscription!: Subscription
  ratings: string[] = ["G", "PG", "PG13", "R", "NC-13"];

  constructor(private movieSvc: MovieService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // get id from the url
    this.actRoute.params.subscribe(parms => {
      this.movieId = parms["id"]
    });

    // get the movie for the id from the data
    this.subscription = this.movieSvc.getById(this.movieId).subscribe({
      next: (resp) => {
        this.movie = resp;
      },
      error: (err) => {
        console.log("Error retrieving movie: ", err);
      }
    });
  }

  save() {
    this.movieSvc.edit(this.movie).subscribe(
      resp => {
        this.movie = resp as Movie;
        this.router.navigateByUrl("/movie-list");
      },
      err => { console.log(err); }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}