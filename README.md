# Task Management Application

## Description

**Backend**: A RESTful API for managing tasks, built with ASP.NET Core 8.0 and Entity Framework Core (in-memory database). This API supports full CRUD operations for tasks with built-in validation.

**Frontend**: Angular 19 single-page application with pure CSS styling, featuring task management components and service integration.

### Table of Contents

1. [Backend Documentation](#backend-documentation)

   - [Project Setup](#project-setup)
   - [Running in local development](#running-the-aspnet-core-web-api)
   - [API Endpoints](#api-endpoints)
   - [Technical Stack](#technical-stack)

2. [Frontend Documentation](#frontend-documentation)

   - [Project Setup](#frontend-project-setup)
   - [Running in local development](#running-frontend-web-app)
   - [Features](#features)

## Backend Documentation

### Project Setup

### Prerequisites

- **Required**: [.NET 8.0 SDK (recommended).](https://dotnet.microsoft.com/download/dotnet/8.0)
- If using an older version (6.0/7.0), modify `backend.csproj`:
  ```xml
  <TargetFramework>net6.0</TargetFramework> <!-- or net7.0 -->
  ```
- **IDE**:
  - [Visual Studio Code](https://code.visualstudio.com/) (Editor used for the project)
  - Visual Studio 2022

<!-- - [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- IDE (Visual Studio 2022, VS Code) -->

### Installation

Open the terminal

1.  **Clone the repository**:

    Using HTTPS:

    ```bash
    git clone https://github.com/kunjolee/cheil-technical-test-v2.git
    ```

    Using SSH:

    ```bash
    git clone git@github.com:kunjolee/cheil-technical-test-v2.git
    ```

    Then navigate to the project directory:

    ```bash
    cd cheil-technical-test-v2
    ```

## Running the ASP.NET Core Web API

### Local setup

**From project root cheil-technical-test-v2:**

Open the terminal and then navigate to the backend directory

```bash
cd backend
```

Make sure to verify your location (should output):

```bash
pwd
# -> /cheil-technical-test-v2/backend

```

**Restore dependencies and build:**

```bash
dotnet restore
dotnet build
```

**Run the application:**

```bash
dotnet run
```

**Access the API at:**

```
http://localhost:5227
```

**Access Swagger UI at:**

```
http://localhost:5227/swagger/index.html
```

**Unit testing:**

```bash
dotnet test
```

## API Endpoints

| Method | Endpoint                   | Description           | Status Codes |
| ------ | -------------------------- | --------------------- | ------------ |
| GET    | `/api/tasks`               | Get all tasks         | 200          |
| GET    | `/api/tasks/{id}`          | Get task by ID        | 200, 404     |
| POST   | `/api/tasks`               | Create new task       | 201, 400     |
| PUT    | `/api/tasks/{id}/complete` | Mark task as complete | 204, 404     |
| DELETE | `/api/tasks/{id}`          | Delete task           | 204, 404     |

> Swagger documentation available at `/swagger` when running.

## Technical Stack

### Core Technologies

- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core 9.0.4
- Swashbuckle.AspNetCore 6.6.2 (Swagger)

### Testing

- xUnit 2.4.2
- Moq 4.18.4
- coverlet.collector 6.0.0

## Key Features

- Repository pattern implementation
- In-memory database (EF Core)
- Automatic Swagger documentation
- Built-in validation for task creation
- Unit test coverage (Bonus completed)

## Frontend Documentation

### Frontend Project Setup

### Prerequisites

- **Required**: Node.js 18+
- Angular CLI (npm install -g @angular/cli@19.2.8)
- **IDE**:
  - [Visual Studio Code](https://code.visualstudio.com/) (Editor used for the project)
  - Visual Studio 2022

### Installation

If not already done, refer to the [Installation guide](#installation)

## Running-frontend-web-app

### Local Setup

**From project root cheil-technical-test-v2:**

Open the terminal and then navigate to the frontend directory

```bash
cd frontend
```

Make sure to verify your location (should output):

```bash
pwd
# -> /cheil-technical-test-v2/frontend

```

**Install dependencies:**

```bash
npm install
```

**Run the application:**

```bash
npm run start
```

Access: http://localhost:4200

🚨 Important: Ensure backend is running first!

🔴 **The backend must be running simultaneously** - otherwise the frontend will show connection errors.

For more details refer to [Backend Running in local development](#running-the-aspnet-core-web-api)

## Features

- Angular 19 (standalone components)

- Pure CSS (no UI frameworks)

- Route lazy-loading

- Task service with HTTP client

- Notification Service
