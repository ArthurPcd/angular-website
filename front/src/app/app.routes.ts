import {Routes} from '@angular/router';
import {HomeComponent} from '../screens/home/home.component';
import {LoginComponent} from '../screens/login/login.component';
import {DashboardComponent} from '../screens/dashboard/dashboard.component';
import {AuthGuard} from './app.authGuard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];
