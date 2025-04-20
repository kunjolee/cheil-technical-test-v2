import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';

/**
 * Component for displaying and managing a list of tasks.
 * Shows tasks in separate pending/completed sections and handles task operations.
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Array of all tasks
  isLoading = true; // Loading state indicator
  error: string | null = null; // Error message storage

  // Injected services
  private taskService = inject(TaskService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  /**
   * Initializes the component and loads tasks on startup.
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Fetches all tasks from the API.
   * Manages loading state and error handling.
   */
  loadTasks(): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  /**
   * Toggles the completion status of a task.
   * @param id - The ID of the task to toggle
   */
  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      this.taskService.markAsComplete(id).subscribe({
        next: () => {
          task.isCompleted = !task.isCompleted;
          const action = task.isCompleted ? 'completed' : 'marked as pending';
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
        },
      });
    }
  }

  /**
   * Deletes a task after confirmation.
   * Updates the task list and shows notification on success.
   * @param id - The ID of the task to delete
   */
  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task.id !== id);
          this.notificationService.showSuccess(
            'Task Deleted',
            'The task was deleted successfully'
          );
        },
        error: (err) => {
          this.notificationService.showError(
            'Deletion Failed',
            'Failed to delete the task'
          );
        },
      });
    }
  }

  /**
   * Counts the number of pending tasks.
   * @returns The count of incomplete tasks
   */
  getPendingCount(): number {
    return this.tasks.filter((task) => !task.isCompleted).length;
  }

  /**
   * Counts the number of completed tasks.
   * @returns The count of completed tasks
   */
  getCompletedCount(): number {
    return this.tasks.filter((task) => task.isCompleted).length;
  }

  /**
   * Navigates to the detail view of a specific task.
   * @param taskId - The ID of the task to view
   */
  viewDetails(taskId: number): void {
    this.router.navigate(['/tasks/detail', taskId]);
  }
}
