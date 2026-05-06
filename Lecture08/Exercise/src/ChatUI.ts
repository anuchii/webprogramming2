import type { User } from "./types/User.js";
import type { ChatMessage } from "./types/ChatMessage.js";

export class ChatUI {

  showUsers(container: HTMLElement, users: User[], onSelect: (user: User) => void) {
    container.innerHTML = "";

    if (users.length === 0) {
      container.innerText = "Keine Users gefunden.";
      return;
    }

    users.forEach(user => {
      const div = document.createElement("div");
      div.classList.add("user-item");
      div.innerText = user.name;
      div.addEventListener("click", () => {
        container.querySelectorAll(".user-item").forEach(el => el.classList.remove("active"));
        div.classList.add("active");
        onSelect(user);
      });
      container.appendChild(div);
    });
  }

  showConversation(container: HTMLElement, messages: ChatMessage[], currentUserId: string) {
    container.innerHTML = "";

    if (messages.length === 0) {
      container.innerHTML = "<p class='no-messages'>Noch keine Nachrichten.</p>";
      return;
    }

    messages.forEach(msg => this.appendMessage(container, msg, currentUserId));
    container.scrollTop = container.scrollHeight;
  }

  appendMessage(container: HTMLElement, msg: ChatMessage, currentUserId: string) {
    const div = document.createElement("div");
    div.classList.add("chat-message", msg.sender_id === currentUserId ? "sent" : "received");

    const text = document.createElement("span");
    text.innerText = msg.message;
    div.appendChild(text);

    if (msg.timestamp) {
      const time = document.createElement("small");
      time.innerText = new Date(msg.timestamp * 1000).toLocaleString();
      div.appendChild(time);
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  setChatHeader(name: string) {
    const header = document.getElementById("chat-header");
    if (header) header.innerText = name;
  }
}
