import { Component, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit';
import { Subscription } from 'rxjs';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css'
})
export class CreditListComponent implements OnInit {
  title: string = "Credit-List!";

  credits: Credit[] | undefined;
  subscription!: Subscription;

  constructor(private creditSvc: CreditService) { }

  ngOnInit(): void {

    this.subscription = this.creditSvc.list().subscribe(
      (resp) => {
        this.credits = resp;
      }
    );
  }

  delete(index: number): void {
    this.credits?.splice(index, 1);
  }

}
