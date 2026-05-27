import { Component, Input, OnChanges, SimpleChanges, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, ChatMessage, User } from '../../api.service';

@Component({
  selector: 'app-conversation',
  imports: [FormsModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent implements OnChanges {
  @Input() user!: User;
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  apiService = inject(ApiService);

  readonly messages = signal<ChatMessage[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  newMessage = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.loadMessages();
    }
  }

  async loadMessages() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      const data = await this.apiService.getConversation(this.user.id);
      this.messages.set(data);
      this.scrollToBottom();
    } catch {
      this.errorMessage.set('Failed to load messages');
    } finally {
      this.isLoading.set(false);
    }
  }

  async sendMessage() {
    if (!this.newMessage.trim()) return;
    const content = this.newMessage.trim();
    this.newMessage = '';
    try {
      await this.apiService.sendMessage(this.user.id, content);
      await this.loadMessages();
    } catch {
      this.errorMessage.set('Failed to send message');
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const el = this.messageContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  }
}
