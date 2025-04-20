import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateTask } from '../../models/task.model';
import { NotificationService } from '../../../shared/services/notification.service';

/**
 * Component for creating new tasks through a reactive form.
 * Handles form validation, submission, and user feedback.
 */
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  // Injected dependencies
  router = inject(Router);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private notificationService = inject(NotificationService);

  // Component state
  isSubmitting = false; // Form submission flag
  error: string | null = null; // Form error message

  /**
   * Reactive form definition with validation rules.
   * - Title: Required, 3-100 chars, alphanumeric + basic accents
   * - Description: Optional, max 255 chars
   */
  taskForm = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/),
      ],
    ],
    description: ['', [Validators.maxLength(255)]],
  });

  /**
   * Handles form submission.
   * - Validates form
   * - Creates task via API
   * - Shows notification and navigates on success
   * - Handles errors gracefully
   */
  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.isSubmitting = true;
    this.taskService.createTask(this.taskForm.value as CreateTask).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Task Created',
          'Your task has been successfully created!'
        );
        this.router.navigate(['/tasks/list']);
      },
      error: (err) => {
        this.notificationService.showError(
          'Creation Failed',
          'There was an error creating your task'
        );
        this.isSubmitting = false;
      },
    });
  }

  /**
   * Navigates back to the task list view.
   */
  navigateToList(): void {
    this.router.navigate(['/tasks/list']);
  }

  /**
   * Convenience getter for form's title control.
   * Used for validation in template.
   */
  get title() {
    return this.taskForm.get('title');
  }

  /**
   * Convenience getter for form's description control.
   * Used for validation in template.
   */
  get description() {
    return this.taskForm.get('description');
  }
}
