import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roleassign',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './roleassign.html',
  styleUrl: './roleassign.css'
})
export class Roleassign {
  roleForm: FormGroup;
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.roleForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) return;

    const { email, role } = this.roleForm.value;

    this.authService.assignRole(email, role).subscribe({
      next: () => {
        this.toastr.success(`<b>Role "${role}"</b> assigned to <i>${email}</i>`);
        this.roleForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(
          `Failed to assign role: ${err.message || 'Unknown error'}`,
          'Error',
          { timeOut: 5000 }
        );
      }
    });
  }
}