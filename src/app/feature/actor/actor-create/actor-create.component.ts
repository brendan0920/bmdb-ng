import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Subscription } from 'rxjs';
import { ActorService } from '../../../service/actor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrl: './actor-create.component.css'
})
export class ActorCreateComponent implements OnInit, OnDestroy {
  title: string = "Actor Create";
  newActor: Actor = new Actor();
  subscription!: Subscription;
  genders: string[] = ["Male", "Female"];

  constructor(private actorSvc: ActorService, private router: Router) { }

  ngOnInit(): void {

  }

  addActor() {
    // call actorSvc.add method.
    this.subscription = this.actorSvc.add(this.newActor).subscribe(
      (resp) => {
        // redirect to actor-list component
        this.router.navigateByUrl("/actor-list");
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
