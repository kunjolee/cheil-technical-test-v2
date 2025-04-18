using TaskManagementApp.Models;
using TaskManagementApp.Repositories;

namespace TaskManagementApp.Services;

public class TaskService
{
    private readonly ITaskRepository _repository;
    private readonly ILogger<TaskService> _logger;

    public TaskService(ITaskRepository repository, ILogger<TaskService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<IEnumerable<TaskItem>> GetAllTasks()
    {
        return await _repository.GetAllTasks();
    }

    public async Task<TaskItem?> GetTaskById(int id)
    {
        return await _repository.GetTaskById(id);
    }

    public async Task<TaskItem> CreateTask(TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Title))
        {
            throw new ArgumentException("Title is required");
        }

        return await _repository.AddTask(task);
    }

    public async Task MarkTaskAsCompleted(int id)
    {
        await _repository.MarkTaskAsCompleted(id);
    }

    public async Task DeleteTask(int id)
    {
        await _repository.DeleteTask(id);
    }
}