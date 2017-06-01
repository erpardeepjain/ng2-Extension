import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';
import { GlobalService } from './GlobalService'

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PortfolioComponent,
    DashboardComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }