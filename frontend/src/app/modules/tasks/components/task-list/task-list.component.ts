import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;
  error: string | null = null;

  private taskService = inject(TaskService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadTasks();
  }

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

  getPendingCount(): number {
    return this.tasks.filter((task) => !task.isCompleted).length;
  }

  getCompletedCount(): number {
    return this.tasks.filter((task) => task.isCompleted).length;
  }

  viewDetails(taskId: number): void {
    this.router.navigate(['/tasks/detail', taskId]);
  }
}
