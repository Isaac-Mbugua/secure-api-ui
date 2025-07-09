import { Routes } from '@angular/router';
import { Auth } from './components/auth/auth';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { Homepage } from './components/homepage/homepage';
import { Admin } from './components/admin/admin';

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
  },

  {
    path: 'admin',
    component: Admin,
    title: 'Admin',
  },
];
