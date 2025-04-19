// src/app/modules/tasks/components/task-form/task-form.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateTask } from '../../models/task.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  router = inject(Router);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private notificationService = inject(NotificationService);

  isSubmitting = false;
  error: string | null = null;

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

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

  navigateToList(): void {
    this.router.navigate(['/tasks/list']);
  }

  get title() {
    return this.taskForm.get('title');
  }
}
