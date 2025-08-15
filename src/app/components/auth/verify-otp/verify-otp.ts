import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-otp',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {
  otpForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.otpForm.invalid) return;
    this.isSubmitting = true;

    const otp = this.otpForm.value;
    this.authService.verifyOtp(otp).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.toaster.info(response.message);
        this.router.navigate(['auth']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toaster.error(error.message);
      },
    });
  }
}
