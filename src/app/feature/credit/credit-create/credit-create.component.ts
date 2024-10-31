import { Component } from '@angular/core';
import { Credit } from '../../../model/credit';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrl: './credit-create.component.css'
})
export class CreditCreateComponent {
  title: string = "Credit Create";
  newCredit: Credit = new Credit();

  credits: Credit[] = [];

  addCredit() {
    this.credits.push(this.newCredit);
    console.log("Credit Added!");
    console.log("Credits List:");
    for (let a of this.credits) {
      console.log(a.details());
    }
    this.newCredit = new Credit();
  }
}
