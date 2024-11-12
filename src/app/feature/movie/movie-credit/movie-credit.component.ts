import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Credit } from '../../../model/credit';
import { MovieService } from '../../../service/movie.service';
import { CreditService } from '../../../service/credit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-credit',
  templateUrl: './movie-credit.component.html',
  styleUrl: './movie-credit.component.css'
})
export class MovieCreditComponent implements OnInit, OnDestroy {
  title: string = "Movie Credits";
  movie!: Movie;
  movieId!: number;
  credits!: Credit[];
  subscription!: Subscription; // asyncronized call

  constructor(
    private movieSvc: MovieService,
    private creditSvc: CreditService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get movieId from URL
    this.subscription = this.actRoute.params.subscribe({
      next: (parms) => {
        this.movieId = parms['movieId'];
        // get the movie for movieId
        this.movieSvc.getById(this.movieId).subscribe({
          next: (resp) => {
            this.movie = resp;
          },
          error: (err) => {
            console.error("MovieCredits: Error getting movie for id: " + this.movieId);
          }
        });
        // get credits for the movie
        this.subscription = this.creditSvc.getByMovieId(this.movieId).subscribe({
          next: (resp) => {
            this.credits = resp;
          },
          error: (err) => {
            console.error("MovieCredits: Error getting credits for movieId: " + this.movieId)
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
