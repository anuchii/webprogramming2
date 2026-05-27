import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  apiService = inject(ApiService);
  router = inject(Router);
  loginStatus = this.apiService.loginStatus;

  async login() {
    await this.apiService.login(this.username, this.password);
    if (this.apiService.loginStatus().loggedIn) {
      this.router.navigate(['/messages']);
    }
  }

  logout() {
    this.username = '';
    this.password = '';
    this.apiService.logout();
  }
}
