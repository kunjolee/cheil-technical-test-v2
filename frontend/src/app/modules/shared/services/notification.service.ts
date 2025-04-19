import { Injectable } from '@angular/core';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification?: NotificationComponent;

  registerNotification(notification: NotificationComponent): void {
    this.notification = notification;
  }

  showSuccess(title: string, message: string): void {
    this.notification?.show('success', title, message);
  }

  showError(title: string, message: string): void {
    this.notification?.show('error', title, message);
  }
}
