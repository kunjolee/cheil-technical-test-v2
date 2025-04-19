using TaskManagementApp.Models;

namespace TaskManagementApp.Tests;

public static class MockData
{
    public static List<TaskItem> GetTestTasks() => new()
    {
        new TaskItem { Id = 1, Title = "Task 1", IsCompleted = false },
        new TaskItem { Id = 2, Title = "Task 2", IsCompleted = true },
        new TaskItem { Id = 3, Title = "Task 3", IsCompleted = false }
    };
}