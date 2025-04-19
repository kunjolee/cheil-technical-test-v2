import { Component, ViewChild } from '@angular/core';
import { NotificationComponent } from './modules/shared/components/notification/notification.component';
import { NotificationService } from './modules/shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NotificationComponent],
  template: `
    <router-outlet></router-outlet>
    <app-notification></app-notification>
  `,
})
export class AppComponent {
  @ViewChild(NotificationComponent) notification!: NotificationComponent;

  constructor(private notificationService: NotificationService) {}

  ngAfterViewInit(): void {
    this.notificationService.registerNotification(this.notification);
  }
}
