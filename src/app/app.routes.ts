import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, provideRoutes, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component'
import { ContactsComponent } from './contacts/contacts.component'
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const initialRoute = () => {
    return true;
};

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'todo-list', component: TodoListComponent }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules});