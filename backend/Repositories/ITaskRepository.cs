using TaskManagementApp.Models;
namespace TaskManagementApp.Repositories;

public interface ITaskRepository
{
    Task<IEnumerable<TaskItem>> GetAllTasks();
    Task<TaskItem?> GetTaskById(int id);
    Task<TaskItem> AddTask(TaskItem task);
    Task<TaskItem> UpdateTask(TaskItem task);
    Task<TaskItem> MarkTaskAsCompleted(int id);
    Task<TaskItem> DeleteTask(int id);
}