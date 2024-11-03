import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Subscription } from 'rxjs';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent implements OnInit, OnDestroy {
  title: string = "Actor-List!";

  actors: Actor[] | undefined;
  subscription!: Subscription;

  constructor(private actorSvc: ActorService) { }

  ngOnInit(): void {
    this.subscription = this.actorSvc.list().subscribe(
      (resp) => {
        this.actors = resp;
      }
    );
  }

  delete(id: number): void {
    this.subscription = this.actorSvc.delete(id).subscribe({
      next: () => {
        // only after receiving successful response, refresh the list.
        this.subscription = this.actorSvc.list().subscribe((resp) => {
          this.actors = resp;
        });
      },
      error: (err) => {
        console.error('Error deleting actor for id:' + id);
        console.error(err);
      },
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
