import { Routes } from "@angular/router";
import { Intro } from "./intro/intro";
import { Login } from "./auth/login/login";
import { Conversation } from "./message/conversation/conversation";

export const routes: Routes = [
  { path: "", component: Intro },
  { path: "login", component: Login },
  { path: "messages", component: Conversation },
  //{ path: '**', component: NotFoundComponent } --> eine WildCard-Route
];
