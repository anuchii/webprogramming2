import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { ConversationComponent } from '../conversation/conversation.component';

@Component({
  selector: 'app-message-list',
  imports: [ConversationComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  apiService = inject(ApiService);

  readonly contacts = signal<User[]>([]);
  readonly activeUser = signal<User | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  async ngOnInit() {
    this.isLoading.set(true);
    try {
      const users = await this.apiService.getUsers();
      this.contacts.set(users);
    } catch {
      this.errorMessage.set('Failed to load contacts');
    } finally {
      this.isLoading.set(false);
    }
  }

  loadConversation(user: User) {
    this.activeUser.set(user);
  }
}
