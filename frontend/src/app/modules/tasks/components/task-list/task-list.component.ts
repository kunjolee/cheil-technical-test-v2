import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  private taskService = inject(TaskService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (err) => console.error('Error cargando tareas:', err),
    });
  }

  toggleTaskCompletion(id: number): void {
    this.taskService.markAsComplete(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error actualizando tarea:', err),
    });
  }

  deleteTask(id: number): void {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Error eliminando tarea:', err),
      });
    }
  }
}
