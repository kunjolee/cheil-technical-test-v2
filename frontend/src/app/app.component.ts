import { Component, ViewChild } from '@angular/core';
import { NotificationComponent } from './modules/shared/components/notification/notification.component';
import { NotificationService } from './modules/shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConfirmationModalComponent } from './modules/shared/components/confirmation-modal/confirmation-modal.component';
import { ConfirmationService } from './modules/shared/services/confirmation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NotificationComponent,
    ConfirmationModalComponent,
  ],
  template: `
    <router-outlet></router-outlet>
    <app-notification></app-notification>
    <app-confirmation-modal></app-confirmation-modal>
  `,
})
export class AppComponent {
  @ViewChild(NotificationComponent) notification!: NotificationComponent;
  @ViewChild(ConfirmationModalComponent)
  confirmationModal!: ConfirmationModalComponent;

  constructor(
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngAfterViewInit(): void {
    this.notificationService.registerNotification(this.notification);
    this.confirmationService.registerConfirmationModal(this.confirmationModal);
  }
}
