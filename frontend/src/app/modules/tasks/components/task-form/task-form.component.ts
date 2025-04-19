// src/app/modules/tasks/components/task-form/task-form.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateTask } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  // Make router public or create a public method
  router = inject(Router);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  isSubmitting = false;
  error: string | null = null;

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.isSubmitting = true;
    this.error = null;

    this.taskService.createTask(this.taskForm.value as CreateTask).subscribe({
      next: () => {
        this.navigateToList();
      },
      error: (err) => {
        this.error = 'Failed to create task. Please try again.';
        this.isSubmitting = false;
        console.error(err);
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
