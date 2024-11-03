import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit';
import { Subscription } from 'rxjs';
import { CreditService } from '../../../service/credit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrl: './credit-create.component.css'
})
export class CreditCreateComponent implements OnInit, OnDestroy {
  title: string = "Credit Create";
  newCredit: Credit = new Credit();
  subscription!: Subscription;

  constructor(private creditSvc: CreditService, private router: Router) { }

  ngOnInit(): void {

  }


  addCredit() {
    // call creditSvc.add method.
    // this.subscription = this.creditSvc.add(this.newCredit).subscribe(
    //   (resp) => {
    //     // redirect to movie-list component
    //     this.router.navigateByUrl("/credit-list");
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
