import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="tasks-container">
      <nav class="nav-panel">
        <button routerLink="list" routerLinkActive="active" class="nav-button">
          <i class="fas fa-list"></i> View Tasks
        </button>
        <button routerLink="new" routerLinkActive="active" class="nav-button">
          <i class="fas fa-plus-circle"></i> Create Task
        </button>
      </nav>
      <div class="content-wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .tasks-container {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .nav-panel {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e1e1e1;
      }

      .nav-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        background: #4a6bff;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .nav-button:hover {
        background: #3a5bef;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .nav-button.active {
        background: #2a4bdf;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .content-wrapper {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      /* Iconos (requiere Font Awesome) */
      .fas {
        font-size: 1.1rem;
      }
    `,
  ],
})
export class TasksPageComponent {}
