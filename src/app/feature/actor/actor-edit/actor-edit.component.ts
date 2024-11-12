import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrl: './actor-edit.component.css'
})
export class ActorEditComponent implements OnInit, OnDestroy {
  title: string = "Actor Edit";
  actorId!: number;
  actor!: Actor;
  subscription!: Subscription;
  genders: string[] = ["Male", "Female"];

  constructor(private actorSvc: ActorService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // get id from the url
    this.actRoute.params.subscribe(parms => {
      this.actorId = parms["id"]
    });

    // get the actor for the id from the data
    this.subscription = this.actorSvc.getById(this.actorId).subscribe({
      next: (resp) => {
        this.actor = resp;
      },
      error: (err) => {
        console.log("Error retrieving actor: ", err);
      }
    });
  }

  save() {
    this.subscription = this.actorSvc.edit(this.actor).subscribe({
      next: (resp) => {
        this.actor = resp as Actor;
        this.router.navigateByUrl("/actor-list");
      },
      error: (err) => { console.log(err); }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
