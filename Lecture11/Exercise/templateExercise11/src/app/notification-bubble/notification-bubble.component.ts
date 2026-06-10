import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../service/web-socket.service';
import { StateService } from '../service/state.service';
import { ApiService, User } from '../service/api.service';
import { Router } from '@angular/router';

 interface Notification {
  user: User;
  message: string;
}

@Component({
  selector: 'app-notification-bubble',
  imports: [CommonModule],
  templateUrl: './notification-bubble.component.html',
  styleUrl: './notification-bubble.component.css'
})
export class NotificationBubbleComponent implements OnInit {
webSocketService = inject(WebSocketService);
stateService = inject(StateService);
apiService = inject(ApiService);
router = inject(Router);

notification = signal<Notification | null>(null);

  ngOnInit() {
    this.webSocketService.newMessage$.subscribe(async msg => {
      
      if (this.stateService.activeConversationUserId() === msg.sender_id) return;

   
      const user = this.stateService.getUserById(msg.sender_id);
      if (!user) return;

  
      const messages = await this.apiService.getConversation(msg.sender_id);
      const lastMessage = messages[messages.length - 1];

      this.notification.set({ user, message: lastMessage.message });
    });
  }

  openConversation() {
    const notif = this.notification();
    if (!notif) return;
    this.stateService.activeConversationUserId.set(notif.user.id);
    this.router.navigate(['/messages']);
    this.notification.set(null);
  }

   close() {
    this.notification.set(null);
  }
}
