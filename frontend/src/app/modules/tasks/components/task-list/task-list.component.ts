// src/app/modules/tasks/components/task-list/task-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
        },
        error: (err) => {
          console.error('Error updating task:', err);
          alert('Failed to update task status');
        },
      });
    }
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          alert('Failed to delete task');
        },
      });
    }
  }
}
