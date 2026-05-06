import { ApiService } from "./ApiService.js";

document.getElementById("reg-btn")!.addEventListener("click", async () => {
  const name = (document.getElementById("reg-name") as HTMLInputElement).value;
  const email = (document.getElementById("reg-email") as HTMLInputElement).value;
  const password = (document.getElementById("reg-password") as HTMLInputElement).value;
  const group = (document.getElementById("reg-group") as HTMLInputElement).value;

  const result = await ApiService.registerUser(name, email, password, group);
  const status = document.getElementById("reg-status")!;
  if (result?.success) {
    status.textContent = `Registered! ID: ${result.id}`;
    setTimeout(() => window.location.href = "index.html", 1000);
  } else {
    status.textContent = `Failed: ${result?.error ?? "unknown error"}`;
  }
});
