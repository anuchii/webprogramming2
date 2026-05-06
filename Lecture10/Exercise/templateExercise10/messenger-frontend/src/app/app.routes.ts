import { Routes } from '@angular/router';
import { Intro } from './intro/intro';
import { Login } from './auth/login/login';
import { MessageList } from './message/message-list/message-list';



export const routes: Routes = [
    { path: '', component: Intro },
    { path: 'login', component: Login },
    { path: 'message', component: MessageList}


];
