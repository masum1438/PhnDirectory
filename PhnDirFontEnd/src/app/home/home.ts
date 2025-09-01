import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink,AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
    private toastr = inject(ToastrService);
  
  // ✅ Use inject() instead of constructor field
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;

  logout() {
    this.authService.logout();
            this.toastr.success(`You have successfully logged out!`);

  }
}
