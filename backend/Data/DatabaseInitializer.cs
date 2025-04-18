using TaskManagementApp.Models;

namespace TaskManagementApp.Data;

public static class DatabaseInitializer
{
    public static void Initialize(AppDbContext context)
    {
        if (context.Tasks.Any())
        {
            return;
        }

        var tasks = new List<TaskItem>
        {
            new() { Title = "Complete cheil technical test v2", Description = "Finish the ASP.NET Core Web API project for cheil to review" },
            new() { Title = "Setup development environment", IsCompleted = true },
            new() { Title = "Review API specifications" }
        };

        context.Tasks.AddRange(tasks);
        context.SaveChanges();
    }
}