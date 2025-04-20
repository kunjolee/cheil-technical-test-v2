import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task, CreateTask } from '../models/task.model';

/**
 * Service for handling all task-related HTTP operations.
 * Provides methods for CRUD operations and task completion toggling.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5227/api/tasks';

  /**
   * Fetches all tasks from the API.
   * @returns Observable<Task[]> - An observable emitting an array of tasks.
   */
  getAllTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.apiUrl)
      .pipe(catchError(this.handleError)); // Handle any errors
  }

  /**
   * Fetches a single task by its ID.
   * @param id - The ID of the task to retrieve.
   * @returns Observable<Task> - An observable emitting the requested task.
   */
  getTaskById(id: number): Observable<Task> {
    return this.http
      .get<Task>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Creates a new task.
   * @param task - The task data to create (title and optional description).
   * @returns Observable<Task> - An observable emitting the newly created task.
   */
  createTask(task: CreateTask): Observable<Task> {
    return this.http
      .post<Task>(this.apiUrl, task)
      .pipe(catchError(this.handleError));
  }

  /**
   * Toggles a task's completion status.
   * @param id - The ID of the task to update.
   * @returns Observable<void> - An observable indicating completion of the operation.
   */
  markAsComplete(id: number): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${id}/complete`, {})
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete.
   * @returns Observable<void> - An observable indicating completion of the operation.
   */
  deleteTask(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP request errors.
   * @private
   * @param error - The HTTP error response.
   * @returns An observable with a user-friendly error message.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
