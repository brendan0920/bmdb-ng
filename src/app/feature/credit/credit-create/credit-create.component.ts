import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit';
import { Subscription } from 'rxjs';
import { CreditService } from '../../../service/credit.service';
import { Router } from '@angular/router';
import { Actor } from '../../../model/actor';
import { Movie } from '../../../model/movie';
import { MovieService } from '../../../service/movie.service';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrl: './credit-create.component.css'
})
export class CreditCreateComponent implements OnInit, OnDestroy {
  title: string = "Credit Create";
  newCredit: Credit = new Credit();
  subscription!: Subscription;
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router) { }

  ngOnInit(): void {
    // populate list of movies
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.error("Credit Create Error: error loading movies." + err.message);
      }
    });

    // populate list of actors
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.error("Credit Create Error: error loading actors." + err.message);
      }
    });
  }

  addCredit() {
    // call creditSvc.add method.
    this.subscription = this.creditSvc.add(this.newCredit).subscribe({
      next: (resp) => {
        // redirect to credit-list component
        this.router.navigateByUrl("/credit-list");
      },
      error: (err) => {
        console.error("Error creating credit: " + err.message);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}








// Add a new line item
addLineItem(): void {
  this.newLineItem.requestId = this.requestId; // Ensure the new line item is associated with the correct request
  this.subscription = this.lineItemSvc.add(this.newLineItem).subscribe({
    next: (resp) => {
      console.log('Line item added:', resp);
      // Refresh line items after adding a new one
      this.lineItems.push(resp); // Add the newly created line item to the array
      this.newLineItem = new LineItem(); // Reset the newLineItem
    },
    error: (err) => {
      console.error('Error adding line item:', err);
    }
  });
}

// Update an existing line item
editLineItem(lineItem: LineItem): void {
  this.subscription = this.lineItemSvc.edit(lineItem).subscribe({
    next: (resp) => {
      console.log('Line item updated:', resp);
      // Refresh the line items after updating
      const index = this.lineItems.findIndex(item => item.id === resp.id);
      if (index !== -1) {
        this.lineItems[index] = resp; // Update the line item in the array
      }
    },
    error: (err) => {
      console.error('Error updating line item:', err);
    }
  });
}







import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { Product } from '../../../model/product';
import { LineItemService } from '../../../service/line-item.service';
import { RequestService } from '../../../service/request.service';
import { ProductService } from '../../../service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrl: './line-item-create.component.css'
})
export class LineItemCreateComponent implements OnInit, OnDestroy {
  title: string = "Line-Item-Create";
  newLineItem: LineItem = new LineItem();
  subscription!: Subscription;
  requests!: Request;
  requestId!: number;
  products: Product[] = [];
  lineItems!: LineItem[];
  welcomeName: string = "";

  constructor(
    private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private productSvc: ProductService,
    private router: Router,
    private sysSvc: SystemService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.welcomeName = this.sysSvc.loggedInUser.firstName;

    // Get requestId from URL parameters
    this.actRoute.params.subscribe((params) => {
      this.requestId = +params['requestId'];  // + to convert to number
      console.log('Request ID:', this.requestId);
    });

    // populate list of products
    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.error("LineItem Create Error: error loading products." + err.message);
      }
    });

  }

  addLineItem(): void {
    // Assign the productId from the selected product
    if (this.newLineItem.product) {
      this.newLineItem.productId = this.newLineItem.product.id;  // Ensure we send productId, not the whole product object
    }

    // Associate the line item with the current request
    this.newLineItem.requestId = this.requestId;

    this.subscription = this.lineItemSvc.add(this.newLineItem).subscribe({
      next: () => {
        // After adding the line item, refresh the request and line items

        // get the request for requestId
        this.subscription = this.requestSvc.getById(this.requestId).subscribe({
          next: (resp) => {
            console.log("Request response:", resp);
            this.requests = resp;
          },
          error: (err) => {
            console.error("Request-LineItems: Error getting request for id: ", err + this.requestId);
          }
        });

        // get lineItems for the request
        this.subscription = this.lineItemSvc.getByReqId(this.requestId).subscribe({
          next: (resp) => {
            console.log("Line items response:", resp);
            this.lineItems = resp;
          },
          error: (err) => {
            console.error("Request-LineItems: Error getting lineItems for requestId: ", err + this.requestId)
          }
        });

        // redirect to lines-for-req/:requestId component
        this.router.navigateByUrl(`/lines-for-req/${this.requestId}`);
      },
      error: (err) => {
        console.error("Error adding line item:", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
