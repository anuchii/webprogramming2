import { ApiService } from "./ApiService.js";
import { StateManager } from "./StateManager.js";

document.getElementById("btn-login")!.addEventListener("click", async () => {
  const email = (document.getElementById("login-email") as HTMLInputElement).value;
  const pass = (document.getElementById("login-pass") as HTMLInputElement).value;

  const response = await ApiService.loginUser(email, pass);

  if (response.token && response.id) {
    StateManager.setToken(response.token);
    StateManager.setUserId(response.id);
    window.location.href = "index.html";
  } else {
    const status = document.getElementById("login-status");
    if (status) status.textContent = "Login fehlgeschlagen.";
  }
});
