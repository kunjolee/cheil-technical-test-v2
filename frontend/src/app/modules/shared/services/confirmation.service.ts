import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';

interface ConfirmationOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private confirmationModal?: ConfirmationModalComponent;

  registerConfirmationModal(modal: ConfirmationModalComponent): void {
    this.confirmationModal = modal;
  }

  confirm(options: ConfirmationOptions): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.confirmationModal) {
        console.error('Confirmation modal not registered');
        resolve(false);
        return;
      }

      this.confirmationModal.title = options.title || 'Confirm Action';
      this.confirmationModal.message =
        options.message || 'Are you sure you want to perform this action?';
      this.confirmationModal.confirmText = options.confirmText || 'Confirm';
      this.confirmationModal.cancelText = options.cancelText || 'Cancel';
      this.confirmationModal.isVisible = true;

      const confirmSub = this.confirmationModal.confirm.subscribe(() => {
        resolve(true);
        confirmSub.unsubscribe();
        cancelSub.unsubscribe();
      });

      const cancelSub = this.confirmationModal.cancel.subscribe(() => {
        resolve(false);
        confirmSub.unsubscribe();
        cancelSub.unsubscribe();
      });
    });
  }
}
