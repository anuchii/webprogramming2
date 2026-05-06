import { ApiService } from "./ApiService.js";
import { ChatUI } from "./ChatUI.js";
import { StateManager } from "./StateManager.js";
import type { User } from "./types/User.js";

if (!StateManager.isLoggedIn()) {
  window.location.href = "login.html";
}

const ui = new ChatUI();
const token = StateManager.getToken()!;
const currentUserId = StateManager.getUserId()!;
let selectedUser: User | null = null;

async function init() {
  const userList = document.getElementById("user-list")!;
  const users = await ApiService.getUsers(token, currentUserId);
  ui.showUsers(userList, users, onUserSelected);
}

async function onUserSelected(user: User) {
  selectedUser = user;
  ui.setChatHeader(user.name);

  const messages = await ApiService.getConversation(token, currentUserId, user.id);
  const messagesContainer = document.getElementById("chat-messages")!;
  ui.showConversation(messagesContainer, messages, currentUserId);
}

document.getElementById("chat-form")!.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!selectedUser) return;

  const input = document.getElementById("chat-input") as HTMLInputElement;
  const message = input.value.trim();
  if (!message) return;

  const response = await ApiService.sendMessage(token, currentUserId, selectedUser.id, message);

  if (response.success) {
    const messagesContainer = document.getElementById("chat-messages")!;
    ui.appendMessage(messagesContainer, {
      sender_id: currentUserId,
      receiver_id: selectedUser.id,
      message,
      timestamp: Math.floor(Date.now() / 1000),
    }, currentUserId);
    input.value = "";
  }
});

document.getElementById("btn-logout")!.addEventListener("click", () => {
  StateManager.clear();
  window.location.href = "login.html";
});

init();
