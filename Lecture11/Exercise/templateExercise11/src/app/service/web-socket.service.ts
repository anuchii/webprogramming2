import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface WebSocketMessage {
  event: string;
  sender_id: string;
  receiver_id: string;
  timestamp_ms: number;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor() {}
  newMessage$ = new Subject<WebSocketMessage>();
  private socket: WebSocket | null = null;

  connect(userId: string, token: string) {
    const url = `ws://webp-ilv-backend.cs.technikum-wien.at:3000?user_id=${userId}&token=${token}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket verbunden! ✅');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === 'message') {
        this.newMessage$.next(data); // ← weiterleiten!
      }
      console.log('Neue Nachricht:', data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket getrennt 🙅🏻‍♀️');
    };
  }
  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}
