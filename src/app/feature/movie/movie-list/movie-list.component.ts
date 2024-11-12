import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit, OnDestroy {
  title: string = "Movie-List!";

  movies!: Movie[];
  subscription!: Subscription;
  welcomeName: string = "";
  sortOrder: string = "asc";
  sortCriteria: string = "id";

  constructor(
    private movieSvc: MovieService,
    private sysSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.welcomeName = this.sysSvc.loggedInUser.firstName;
    this.subscription = this.movieSvc.list().subscribe(
      (resp) => {
        this.movies = resp;
      }
    );
  }


  delete(id: number): void {
    this.subscription = this.movieSvc.delete(id).subscribe({
      next: () => {
        // only after receiving successful response, refresh the list.
        this.subscription = this.movieSvc.list().subscribe((resp) => {
          this.movies = resp;
        });
      },
      error: (err) => {
        console.error('Error deleting movie for id:' + id);
        console.error(err);
      },
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sortBy(column: string): void {
    if (column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }

}
