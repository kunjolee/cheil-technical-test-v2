import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Type definition for notification categories.
 * Determines styling and icon display.
 */
export type NotificationType = 'success' | 'error' | 'info';

/**
 * Reusable notification component that displays temporary messages.
 * Supports different notification types and auto-dismissal after timeout.
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="notification"
      [class]="type"
      [class.visible]="isVisible"
      (click)="dismiss()"
    >
      <div class="icon">
        @switch (type) { @case ('success') { ✓ } @case ('error') { ✕ } @case
        ('info') { ⓘ } }
      </div>
      <div class="content">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  /**
   * Type of notification (determines styling and icon).
   * Defaults to 'info'.
   */
  @Input() type: NotificationType = 'info';

  /**
   * Notification header text.
   */
  @Input() title: string = '';

  /**
   * Detailed notification message.
   */
  @Input() message: string = '';

  /**
   * Controls visibility of the notification.
   */
  isVisible: boolean = false;

  /**
   * Displays the notification with specified parameters.
   * Automatically dismisses after 4 seconds.
   * @param type - The notification type
   * @param title - The notification title
   * @param message - The detailed message
   */
  show(type: NotificationType, title: string, message: string): void {
    this.type = type;
    this.title = title;
    this.message = message;
    this.isVisible = true;

    // Auto-dismiss after 4 seconds
    setTimeout(() => this.dismiss(), 4000);
  }

  /**
   * Hides the notification immediately.
   * Can be triggered by timeout or user click.
   */
  dismiss(): void {
    this.isVisible = false;
  }
}
