import { Routes } from '@angular/router';
import { Auth } from './components/auth/auth';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { Homepage } from './components/homepage/homepage';
import { Admin } from './components/admin/admin';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
    title: 'Authentication',
    children: [
      { path: '', component: Login },
      { path: 'register', component: Register },
    ],
  },
  {
    path: '',
    component: Homepage,
    title: 'Homepage',
    canActivate: [authGuard],
  },

  {
    path: 'admin',
    component: Admin,
    title: 'Admin',
    canActivate: [adminGuard],
  },
];
