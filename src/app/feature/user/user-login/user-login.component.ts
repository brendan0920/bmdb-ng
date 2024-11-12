import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = "User Login";
  userLogin: UserLogin = new UserLogin();
  message?: string = undefined;
  subscription!: Subscription;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService
  ) { }

  ngOnInit(): void {
    // invalidate the current loggedInUser
    this.sysSvc.loggedInUser = new User();
    // could set the username and password for testing purposes
    this.userLogin.username = "hgilmore";
    this.userLogin.password = "pwd";

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login() {
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        this.sysSvc.loggedInUser = resp;
        this.router.navigateByUrl("/movie-list");
      },
      error: (err) => {
        this.message = "Invalid username/password. Please try again.";
      }
    });
  }
}
