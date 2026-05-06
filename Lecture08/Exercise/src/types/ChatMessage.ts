// Example chat message
export interface ChatMessage {
  sender_id: string;
  receiver_id: string;
  message: string;
  timestamp?: number; // if your API returns one
}