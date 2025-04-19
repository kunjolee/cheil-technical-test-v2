import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [DatePipe],
})
export class TaskDetailComponent implements OnInit {
  task?: Task;
  isLoading = true;
  error: string | null = null;

  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private datePipe = inject(DatePipe);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTask(+id);
    }
  }

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

  toggleCompletion(id: number): void {
    if (!this.task) return;

    this.taskService.markAsComplete(id).subscribe({
      next: () => {
        this.task!.isCompleted = !this.task!.isCompleted;
      },
      error: (err) => {
        console.error('Error updating task:', err);
        alert('Failed to update task status');
      },
    });
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.router.navigate(['/tasks/list']);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          alert('Failed to delete task');
        },
      });
    }
  }

  formatDate(date: string | undefined): string {
    return date ? this.datePipe.transform(date, 'medium') || '' : '';
  }

  navigateToList(): void {
    this.router.navigate(['/tasks/list']);
  }
}
