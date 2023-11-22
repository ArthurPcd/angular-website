import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formData = {email: '', password: ''};
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  handleLogin() {
    this.authService.tryLogin(this.formData)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error logging in:', error);
          alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
        },
      );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
