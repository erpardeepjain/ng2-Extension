import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, provideRoutes, PreloadAllModules, CanActivate } from '@angular/router';

import { AuthGuard } from './app.auth-guard';
import { AppComponent } from './app.component'
import { ContactsComponent } from './contacts/contacts.component'
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ArticlesComponent } from './articles/articles.component';

const initialRoute = () => {
    return true;
};

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'todo-list', component: TodoListComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules});