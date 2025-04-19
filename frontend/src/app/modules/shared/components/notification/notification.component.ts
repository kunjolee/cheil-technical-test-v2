import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'success' | 'error' | 'info';

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
  @Input() type: NotificationType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  isVisible: boolean = false;

  show(type: NotificationType, title: string, message: string): void {
    this.type = type;
    this.title = title;
    this.message = message;
    this.isVisible = true;

    setTimeout(() => this.dismiss(), 4000);
  }

  dismiss(): void {
    this.isVisible = false;
  }
}
