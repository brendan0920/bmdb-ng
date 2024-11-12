import { Actor } from "./actor";
import { Movie } from "./movie";

export class Credit {
    id: number;
    movieId: number;
    actorId: number;
    movie: Movie;
    actor: Actor;
    role: string;

    constructor(
        id: number = 0,
        movieId: number = 0,
        actorId: number = 0,
        movie: Movie = new Movie(),
        actor: Actor = new Actor(),
        role: string = "") {
        this.id = id;
        this.movieId = movieId;
        this.actorId = actorId;
        this.movie = movie;
        this.actor = actor;
        this.role = role;
    }

}
