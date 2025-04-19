import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="app-container">
      <nav class="main-nav">
        <div class="nav-brand">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H12.01M12 16H12.01"
              stroke="#f05599"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>TaskFlow</span>
        </div>
        <div class="nav-links">
          <a routerLink="list" routerLinkActive="active" class="nav-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            My Tasks
          </a>
          <a routerLink="new" routerLinkActive="active" class="nav-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Create New
          </a>
        </div>
      </nav>

      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: `
    /* Estilos globales */
    :host {
      --primary-color: #f05599;
      --primary-light: rgba(240, 85, 153, 0.1);
      --text-dark: #2d3748;
      --text-light: #4a5568;
      --bg-white: #ffffff;
      --bg-gray: #f7fafc;
    }
    
    .app-container {
      min-height: 100vh;
      background: var(--bg-gray);
      display: flex;
      flex-direction: column;
    }
    
    /* Navbar */
    .main-nav {
      background: var(--bg-white);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      color: var(--text-dark);
      font-size: 1.25rem;
    }
    
    .nav-brand svg {
      width: 28px;
      height: 28px;
    }
    
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-light);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover {
      color: var(--primary-color);
      background: var(--primary-light);
    }
    
    .nav-link.active {
      color: var(--primary-color);
      background: var(--primary-light);
    }
    
    .nav-link svg {
      width: 20px;
      height: 20px;
    }
    
    /* Área de contenido */
    .content-area {
      flex: 1;
      padding: 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }
    
    @media (max-width: 768px) {
      .main-nav {
        padding: 1rem;
      }
      
      .nav-brand span {
        display: none;
      }
      
      .nav-link span {
        display: none;
      }
      
      .nav-link {
        padding: 0.5rem;
      }
    }
  `,
})
export class TasksPageComponent {}
