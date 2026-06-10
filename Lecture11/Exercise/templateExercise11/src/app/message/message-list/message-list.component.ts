import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService, User } from '../../service/api.service';
import { ConversationComponent } from '../conversation/conversation.component';
import { LocalStorageService } from '../../service/local-storage.service';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'app-message-list',
  imports: [ConversationComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  apiService = inject(ApiService);
  localStorageService = inject(LocalStorageService);
  stateService =  inject(StateService);

  readonly contacts = signal<User[]>([]);
  readonly activeUser = signal<User | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly knownUsers = signal<User[]>([]);
  readonly otherUsers = signal<User[]>([]);

  async ngOnInit() {
    this.isLoading.set(true);
    try {
      const users = await this.apiService.getUsers();
      this.stateService.users.set(users);
      const knownIds = this.localStorageService.getKnownUserIds();

      this.contacts.set(users);
      this.knownUsers.set(users.filter((u) => knownIds.includes(u.id)));
      this.otherUsers.set(users.filter(u => !knownIds.includes(u.id)));
      
    } catch {
      this.errorMessage.set('Failed to load contacts');
    } finally {
      this.isLoading.set(false);
    }
  }

  loadConversation(user: User) {
    this.localStorageService.addKnownUserId(user.id);
    this.stateService.activeConversationUserId.set(user.id);
    this.activeUser.set(user);
  }
}
