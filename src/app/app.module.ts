import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { Angular2SocialLoginModule } from "angular2-social-login";
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { ToasterModule } from 'angular2-toaster';
import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster'

import { routing } from './app.routes';
import { AuthGuard } from './app.auth-guard';
import { GlobalService } from './GlobalService'

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ArticlesComponent } from './articles/articles.component';

let providers = {
    "google": {
      "clientId": "788548936361-h264uq1v36c5ddj0hf5fpmh7obks94vh.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "438105992979968",
      "apiVersion": "v2.8" //like v2.4 
    }
};

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PortfolioComponent,
    DashboardComponent,
    TodoListComponent,
    LoginComponent,
    SignupComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    routing,
    ToasterModule,
    Angular2SocialLoginModule,   
    ShareButtonsModule.forRoot()
  ],
  providers: [GlobalService, AuthGuard, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);