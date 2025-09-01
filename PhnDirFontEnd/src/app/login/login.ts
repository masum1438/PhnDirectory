import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  form: FormGroup; // ✅ declare property
private toastr = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
     
    private authService: AuthService,
    private router: Router
  ) {
    // ✅ initialize form here
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: res => {
          console.log(res);
          this.authService.saveToken(res.token,res.userRoles);
         this.toastr.success('Login successful');
          this.router.navigate(['/']);
        },
        error: err => this.toastr.error(err.error)
      });
    }
  }
}
