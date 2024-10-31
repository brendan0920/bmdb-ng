import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Subscription } from 'rxjs';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent implements OnInit {
  title: string = "Actor-List!";

  actors: Actor[] | undefined;
  subscription!: Subscription;

  constructor(private actorSvc: ActorService) { }

  ngOnInit(): void {
    // this.actors = [
    //   new Actor(1, "Christian", "Bale", "M", new Date("1974-01-30")),
    //   new Actor(2, "Heath", "Ledger", "M", new Date("1979-01-22")),
    //   new Actor(3, "Joaquin", "Phoenix", "M", new Date("1974-10-28")),
    //   new Actor(4, "Robert", "De Niro", "M", new Date("1943-08-17")),
    //   new Actor(5, "Ryan", "Gosling", "M", new Date("1980-11-12")),
    //   new Actor(6, "Rachel", "McAdams", "F", new Date("1978-11-17")),
    //   new Actor(7, "Matt", "Damon", "M", new Date("1970-10-08")),
    //   new Actor(8, "Ben", "Affleck", "M", new Date("1972-08-15")),
    //   new Actor(9, "Robin", "Williams", "M", new Date("1957-07-21")),
    //   new Actor(10, "Jack", "O'Connell", "M", new Date("1990-08-01")),
    //   new Actor(14, "Harry", "Lawtey", "M", new Date("1986-02-26"))
    // ];
    this.subscription = this.actorSvc.list().subscribe(
      (resp) => {
        this.actors = resp;
      }
    );
  }

  delete(index: number): void {
    this.actors?.splice(index, 1);
  }


}
