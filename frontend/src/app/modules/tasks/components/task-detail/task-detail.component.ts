import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification.service';
import { ConfirmationService } from '../../../shared/services/confirmation.service';

/**
 * Component for displaying and managing detailed view of a single task.
 * Handles task completion toggling, deletion, and navigation.
 */
@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [DatePipe], // Provides DatePipe for date formatting
})
export class TaskDetailComponent implements OnInit {
  task?: Task; // Current task being viewed
  isLoading = true; // Loading state flag
  error: string | null = null; // Error message storage

  // Dependency injections
  private taskService = inject(TaskService);
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private datePipe = inject(DatePipe);
  private confirmationService = inject(ConfirmationService);

  /**
   * Initializes the component and loads the task based on route ID.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTask(+id); // Convert string ID to number and load task
    }
  }

  /**
   * Loads a task by ID from the API.
   * Updates component state (loading/error) during the operation.
   * @param id - The ID of the task to load
   */
  loadTask(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load task details. Please try again.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  /**
   * Toggles the completion status of the current task.
   * Shows notification on success/error.
   * @param id - The ID of the task to update
   */
  toggleCompletion(id: number): void {
    if (!this.task) return;

    this.taskService.markAsComplete(id).subscribe({
      next: () => {
        this.task!.isCompleted = !this.task!.isCompleted;
        const action = this.task!.isCompleted
          ? 'completed'
          : 'marked as pending';
        this.notificationService.showSuccess(
          'Task Updated',
          `Task has been ${action} successfully`
        );
      },
      error: (err) => {
        this.notificationService.showError(
          'Update Failed',
          'Failed to update task status'
        );
        console.error('Error updating task:', err);
      },
    });
  }

  /**
   * Deletes the current task after user confirmation via modal dialog.
   * Shows notification and navigates back to task list on success.
   * @param id - The ID of the task to delete
   * @returns Promise<void> - Resolves when operation completes
   */
  async deleteTask(id: number): Promise<void> {
    const confirmed = await this.confirmationService.confirm({
      title: 'Delete Task',
      message: 'Are you sure you want to delete this task?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (confirmed) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Task Deleted',
            'The task was deleted successfully'
          );
          this.router.navigate(['/tasks/list']);
        },
        error: (err) => {
          this.notificationService.showError(
            'Deletion Failed',
            'Failed to delete the task'
          );
          console.error('Error deleting task:', err);
        },
      });
    }
  }

  /**
   * Formats a date string using Angular's DatePipe.
   * @param date - The date string to format
   * @returns Formatted date string or empty string if date is undefined
   */
  formatDate(date: string | undefined): string {
    return date ? this.datePipe.transform(date, 'medium') || '' : '';
  }

  /**
   * Navigates back to the task list view.
   */
  navigateToList(): void {
    this.router.navigate(['/tasks/list']);
  }
}
