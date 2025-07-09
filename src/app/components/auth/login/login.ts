import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth/auth';
import { ToastrService } from 'ngx-toastr';
import { JWTPayload } from '../../../models/auth-model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isSubmitting = true;

    const credentials = this.loginForm.value;
    this.authService.loginUser(credentials).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.toaster.info(response.message);
        const payload: JWTPayload = JSON.parse(
          atob(response.token.split('.')[1])
        );

        console.log(payload);

        if (payload.role === 'user') {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['admin']).then(() => {
            window.location.reload();
          });
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toaster.error(error.message);
      },
    });
  }
}
