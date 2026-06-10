import { Injectable, signal } from '@angular/core';
import { User } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly users = signal<User[]>([]);

  readonly activeConversationUserId = signal<string | null>(null);
  getUserById(id: string): User | undefined{
    return this.users().find(user => user.id === id);
  }
  constructor() {}
}
