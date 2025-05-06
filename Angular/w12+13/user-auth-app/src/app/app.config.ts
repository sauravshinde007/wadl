import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {path:'', redirectTo: 'register', pathMatch:'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
];

export const appConfig = {
  providers: [provideRouter(routes)],
};
