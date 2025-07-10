import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Register } from '../../models/auth-model';
import { User } from '../../services/user/user';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  user!: Register;
  status!: 'loading' | 'success' | 'error';

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
}
