import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './feature/movie/movie-list/movie-list.component';
import { FormsModule } from '@angular/forms';
import { MovieCreateComponent } from './feature/movie/movie-create/movie-create.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { MenuComponent } from './core/menu/menu.component';
import { ActorCreateComponent } from './feature/actor/actor-create/actor-create.component';
import { ActorListComponent } from './feature/actor/actor-list/actor-list.component';
import { CreditListComponent } from './feature/credit/credit-list/credit-list.component';
import { provideHttpClient } from '@angular/common/http';
import { CreditCreateComponent } from './feature/credit/credit-create/credit-create.component';
import { MovieEditComponent } from './feature/movie/movie-edit/movie-edit.component';
import { ActorEditComponent } from './feature/actor/actor-edit/actor-edit.component';
import { CreditEditComponent } from './feature/credit/credit-edit/credit-edit.component';
import { ActorDetailComponent } from './feature/actor/actor-detail/actor-detail.component';
import { MovieDetailComponent } from './feature/movie/movie-detail/movie-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    NotFoundComponent,
    MenuComponent,
    ActorListComponent,
    CreditListComponent,
    ActorCreateComponent,
    CreditCreateComponent,
    MovieEditComponent,
    ActorEditComponent,
    CreditEditComponent,
    ActorDetailComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
