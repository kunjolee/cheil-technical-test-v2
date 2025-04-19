
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

using TaskManagementApp.Data;
using TaskManagementApp.Models;
using TaskManagementApp.Repositories;

namespace TaskManagementApp.Tests.Repositories;

public class TaskRepositoryTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly TaskRepository _repository;

    public TaskRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDB_" + Guid.NewGuid())
            .Options;

        _context = new AppDbContext(options);
        _repository = new TaskRepository(
            _context,
            new Mock<ILogger<TaskRepository>>().Object);

        _context.Tasks.AddRange(MockData.GetTestTasks());
        _context.SaveChanges();
    }

    [Fact]
    public async Task GetAll_ShouldReturnAllTasks()
    {
        var result = await _repository.GetAllTasks();

        Assert.Equal(3, result.Count());
    }

    [Fact]
    public void GetById_WithValidId_ShouldReturnTask()
    {
        var testTask = _context.Tasks.First();

        var result = _repository.GetTaskById(testTask.Id);

        Assert.NotNull(result);
        Assert.Equal(testTask.Id, result.Id);
    }

    [Fact]
    public async Task Add_ShouldAddNewTask()
    {
        var newTask = new TaskItem { Title = "New Task" };

        await _repository.AddTask(newTask);

        Assert.Contains(_context.Tasks, t => t.Title == "New Task");
    }

    [Fact]
    public async Task MarkAsComplete_ShouldUpdateTask()
    {
        var task = await _context.Tasks.FirstAsync(t => !t.IsCompleted);

        await _repository.MarkTaskAsCompleted(task.Id);

        var updatedTask = await _context.Tasks.FindAsync(task.Id);
        Assert.NotNull(updatedTask);
        Assert.True(updatedTask!.IsCompleted);
    }

    [Fact]
    public async Task Delete_ShouldRemoveTask()
    {
        var task = _context.Tasks.First();

        await _repository.DeleteTask(task.Id);

        Assert.DoesNotContain(_context.Tasks, t => t.Id == task.Id);
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}