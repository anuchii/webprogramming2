import { Injectable, signal } from '@angular/core';

const BASE_URL = 'http://webp-ilv-backend.cs.technikum-wien.at/messenger';

export interface User {
  id: string;
  name: string;
  group_id: string;
}

export interface ChatMessage {
  sender_id: string;
  receiver_id: string;
  message: string;
  timestamp?: string;
}

const initialLoginStatus = {
  loggedIn: false,
  loginError: false,
  id: "",
  username: "",
  token: ""
};

@Injectable({ providedIn: 'root' })
export class ApiService {

  private _loginStatus = signal(initialLoginStatus);
  public loginStatus = this._loginStatus.asReadonly();

  async login(username: string, password: string) {
    try {
      const body = new URLSearchParams({ username_or_email: username, password });
      const response = await fetch(`${BASE_URL}/login.php`, { method: 'POST', body });
      const data = await response.json();

      if (data.token) {
        this._loginStatus.set({
          loggedIn: true,
          loginError: false,
          id: data.id,
          username: username,
          token: data.token
        });
      } else {
        this._loginStatus.set({ ...initialLoginStatus, loginError: true });
      }
    } catch (e) {
      this._loginStatus.set({ ...initialLoginStatus, loginError: true });
    }
  }

  logout() {
    this._loginStatus.set(initialLoginStatus);
  }

  async getUsers(): Promise<User[]> {
    const { token, id } = this._loginStatus();
    const params = new URLSearchParams({ token, id });
    const response = await fetch(`${BASE_URL}/get_users.php?${params}`);
    return response.json();
  }

  async getConversation(user2Id: string): Promise<ChatMessage[]> {
    const { token, id } = this._loginStatus();
    const params = new URLSearchParams({ token, user1_id: id, user2_id: user2Id });
    const response = await fetch(`${BASE_URL}/get_conversation.php?${params}`);
    return response.json();
  }

  async sendMessage(receiverId: string, message: string): Promise<any> {
    const { token, id } = this._loginStatus();
    const body = new URLSearchParams({ token, sender_id: id, receiver_id: receiverId, message });
    const response = await fetch(`${BASE_URL}/send_message.php`, { method: 'POST', body });
    return response.json();
  }
}
