import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { OnInit } from '@angular/core';
import { WebSocketService } from '../../service/web-socket.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  remember = false;

  apiService = inject(ApiService);
  localStorageService = inject(LocalStorageService);
  webSocketService = inject(WebSocketService);
  router = inject(Router);

  loginStatus = this.apiService.loginStatus;

  async login() {
    await this.apiService.login(this.username, this.password);
    if (this.apiService.loginStatus().loggedIn) {
      console.log('Login erfolgreich!');
      console.log('remember:', this.remember);
      this.webSocketService.connect(
        this.apiService.loginStatus().id,
        this.apiService.loginStatus().token
      );

      if (this.remember) {
        console.log('Speichere Daten...');
        this.localStorageService.saveLoginData(this.username, this.password);
      }
      this.router.navigate(['/messages']);
    }
  }

  async ngOnInit() {
    const saved = this.localStorageService.getLoginData();
    if (saved.username && saved.password) {
      this.username = saved.username;
      this.password = saved.password;
      await this.login();
    }
    console.log('ngOnInit Komponente wurde geladen');
  }

  logout() {
    this.username = '';
    this.password = '';
    this.webSocketService.disconnect();
    this.localStorageService.clearLoginData();
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
