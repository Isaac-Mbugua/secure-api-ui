import { Component } from '@angular/core';
import { Register } from '../../models/auth-model';
import { User } from '../../services/user/user';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  user!: Register;
  users!: Register[];
  status!: 'loading' | 'success' | 'error';
  userStatus!: 'loading' | 'success' | 'error';

  constructor(
    private userService: User,
    private toaster: ToastrService,
    private authService: Auth
  ) {}

  loadProfile() {
    this.status = 'loading';
    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.status = 'success';
        this.user = response.user;
      },
      error: (error) => {
        this.status = 'error';
        this.toaster.error(error.message);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.toaster.info('Logged out!');
  }

  loadAllUsers() {
    this.userStatus = 'loading';
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.userStatus = 'success';
        console.log(response.users);
        this.users = response.users;
      },
      error: (error) => {
        this.userStatus = 'error';
        this.toaster.error(error.message);
      },
    });
  }
}
