import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { NotificationBubbleComponent } from './notification-bubble/notification-bubble.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StatusComponent, CommonModule, RouterModule, NotificationBubbleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  appRoutes = routes.filter(r => !!r.title);
}
