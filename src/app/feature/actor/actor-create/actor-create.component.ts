import { Component } from '@angular/core';
import { Actor } from '../../../model/actor';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrl: './actor-create.component.css'
})
export class ActorCreateComponent {
  title: string = "Actor Create";
  newActor: Actor = new Actor();

  actors: Actor[] = [];

  addActor() {
    this.actors.push(this.newActor);
    console.log("Actor Added!");
    console.log("Actors List:");
    for (let a of this.actors) {
      console.log(a.details());
    }
    this.newActor = new Actor();
  }
}
