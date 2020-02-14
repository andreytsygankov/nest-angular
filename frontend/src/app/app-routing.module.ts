import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './services/auth.guard';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {CreateCustomerComponent} from './components/create-customer/create-customer.component';
import {ProfileComponent} from './components/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'create', component: CreateCustomerComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
