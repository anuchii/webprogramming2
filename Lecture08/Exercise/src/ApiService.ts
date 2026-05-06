import type { User } from "./types/User.js";
import type { ChatMessage } from "./types/ChatMessage.js";

export interface ApiResponse {
  success?: boolean;
  error?: string;
  token?: string;
  id?: string;
}

const BASE_URL = "http://webp-ilv-backend.cs.technikum-wien.at/messenger";

export class ApiService {

  static async registerUser(name: string, email: string, password: string, groupId: string): Promise<ApiResponse> {
    const body = new URLSearchParams({ name, email, password, group_id: groupId });
    const response = await fetch(`${BASE_URL}/registrieren.php`, { method: "POST", body });
    return response.json();
  }

  static async loginUser(usernameOrEmail: string, password: string): Promise<ApiResponse> {
    const body = new URLSearchParams({ username_or_email: usernameOrEmail, password });
    const response = await fetch(`${BASE_URL}/login.php`, { method: "POST", body });
    return response.json();
  }

  static async getUsers(token: string, userId: string): Promise<User[]> {
    const params = new URLSearchParams({ token, id: userId });
    const response = await fetch(`${BASE_URL}/get_users.php?${params}`);
    return response.json();
  }

  static async getConversation(token: string, user1Id: string, user2Id: string): Promise<ChatMessage[]> {
    const params = new URLSearchParams({ token, user1_id: user1Id, user2_id: user2Id });
    const response = await fetch(`${BASE_URL}/get_conversation.php?${params}`);
    return response.json();
  }

  static async sendMessage(token: string, senderId: string, receiverId: string, message: string): Promise<ApiResponse> {
    const body = new URLSearchParams({ token, sender_id: senderId, receiver_id: receiverId, message });
    const response = await fetch(`${BASE_URL}/send_message.php`, { method: "POST", body });
    return response.json();
  }
}
