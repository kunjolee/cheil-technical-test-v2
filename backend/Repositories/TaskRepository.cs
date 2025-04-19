using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Data;
using TaskManagementApp.Models;

namespace TaskManagementApp.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;
    private readonly ILogger<TaskRepository> _logger;

    public TaskRepository(AppDbContext context, ILogger<TaskRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<TaskItem>> GetAllTasks()
    {
        try
        {
            return await _context.Tasks.AsNoTracking().ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting all tasks");
            throw;
        }
    }

    public async Task<TaskItem?> GetTaskById(int id)
    {
        try
        {
            return await _context.Tasks.FindAsync(id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while getting task with ID {id}");
            throw;
        }
    }

    public async Task<TaskItem> AddTask(TaskItem task)
    {
        if (task == null) throw new ArgumentNullException(nameof(task));

        try
        {
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
            return task;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while adding a new task");
            throw;
        }
    }

    public async Task<TaskItem> UpdateTask(TaskItem task)
    {
        if (task == null) throw new ArgumentNullException(nameof(task));

        try
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
            return task;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while updating task with ID {task.Id}");
            throw;
        }
    }
    public async Task<TaskItem> MarkTaskAsCompleted(int id)
    {
        try
        {
            var task = await GetTaskById(id);
            if (task == null) throw new KeyNotFoundException($"Task with ID {id} not found");

            task.IsCompleted = !task.IsCompleted;
            await UpdateTask(task);

            return task;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while marking task with ID {id} as completed");
            throw;
        }
    }

    public async Task<TaskItem> DeleteTask(int id)
    {
        try
        {
            var task = await GetTaskById(id);
            if (task == null) throw new KeyNotFoundException($"Task with ID {id} not found");

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while deleting task with ID {id}");
            throw;
        }
    }
}