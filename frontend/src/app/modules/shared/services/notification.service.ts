import { Injectable } from '@angular/core';
import { NotificationComponent } from '../components/notification/notification.component';

/**
 * Service for displaying user notifications throughout the application.
 * Provides typed methods for different notification categories (success, error).
 * Requires registration of a NotificationComponent instance before use.
 */
@Injectable({
  providedIn: 'root', // Singleton service available application-wide
})
export class NotificationService {
  /**
   * Reference to the registered notification component instance.
   * This allows the service to delegate display operations to the component.
   */
  private notification?: NotificationComponent;

  /**
   * Registers the notification component to be used by this service.
   * Must be called once (typically by the app component) before showing notifications.
   * @param notification - The NotificationComponent instance to use
   */
  registerNotification(notification: NotificationComponent): void {
    this.notification = notification;
  }

  /**
   * Displays a success notification with the given title and message.
   * @param title - Brief summary of the notification
   * @param message - Detailed information to display
   */
  showSuccess(title: string, message: string): void {
    this.notification?.show('success', title, message);
  }

  /**
   * Displays an error notification with the given title and message.
   * @param title - Brief summary of the error
   * @param message - Detailed error information
   */
  showError(title: string, message: string): void {
    this.notification?.show('error', title, message);
  }
}
