import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'messages', component: MessageListComponent, title: 'Messages', canActivate: [authGuard] }
];
