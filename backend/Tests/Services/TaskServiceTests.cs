using Moq;
using TaskManagementApp.Models;
using TaskManagementApp.Repositories;
using TaskManagementApp.Services;
using Xunit;

namespace TaskManagementApp.Tests.Services;

public class TaskServiceTests
{
    private readonly Mock<ITaskRepository> _repositoryMock;
    private readonly Mock<ILogger<TaskService>> _loggerMock;
    private readonly TaskService _service;

    public TaskServiceTests()
    {
        _repositoryMock = new Mock<ITaskRepository>();
        _loggerMock = new Mock<ILogger<TaskService>>();
        _service = new TaskService(_repositoryMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task GetAllTasks_ShouldReturnAllTasksFromRepository()
    {
        var expectedTasks = new List<TaskItem>
        {
            new() { Id = 1, Title = "Task 1" },
            new() { Id = 2, Title = "Task 2" }
        };

        _repositoryMock.Setup(r => r.GetAllTasks())
                      .ReturnsAsync(expectedTasks);

        var result = await _service.GetAllTasks();

        Assert.Equal(expectedTasks, result);
        _repositoryMock.Verify(r => r.GetAllTasks(), Times.Once);
    }

    [Fact]
    public async Task GetTaskById_WithExistingId_ShouldReturnTask()
    {
        var expectedTask = new TaskItem { Id = 1, Title = "Test Task" };
        _repositoryMock.Setup(r => r.GetTaskById(1))
                      .ReturnsAsync(expectedTask);

        var result = await _service.GetTaskById(1);

        Assert.Equal(expectedTask, result);
        _repositoryMock.Verify(r => r.GetTaskById(1), Times.Once);
    }

    [Fact]
    public async Task GetTaskById_WithNonExistingId_ShouldReturnNull()
    {
        _repositoryMock.Setup(r => r.GetTaskById(99))
                      .ReturnsAsync((TaskItem?)null);

        var result = await _service.GetTaskById(99);

        Assert.Null(result);
    }

    [Fact]
    public async Task CreateTask_WithValidTask_ShouldReturnCreatedTask()
    {
        var newTask = new TaskItem { Title = "Valid Task" };
        var expectedTask = new TaskItem { Id = 1, Title = "Valid Task" };

        _repositoryMock.Setup(r => r.AddTask(newTask))
                      .ReturnsAsync(expectedTask);

        var result = await _service.CreateTask(newTask);

        Assert.Equal(expectedTask, result);
        _repositoryMock.Verify(r => r.AddTask(newTask), Times.Once);
    }

    [Fact]
    public async Task CreateTask_WithEmptyTitle_ShouldThrowArgumentException()
    {
        var invalidTask = new TaskItem { Title = "" };
        await Assert.ThrowsAsync<ArgumentException>(() => _service.CreateTask(invalidTask));
        _repositoryMock.Verify(r => r.AddTask(It.IsAny<TaskItem>()), Times.Never);
    }

    [Fact]
    public async Task MarkTaskAsCompleted_ShouldUpdateTaskState()
    {
        int testTaskId = 1;

        var completedTask = new TaskItem { Id = testTaskId, IsCompleted = true };
        _repositoryMock.Setup(r => r.MarkTaskAsCompleted(testTaskId))
                     .ReturnsAsync(completedTask)
                     .Verifiable();

        await _service.MarkTaskAsCompleted(testTaskId);

        _repositoryMock.Verify(r => r.MarkTaskAsCompleted(testTaskId), Times.Once);
    }


    [Fact]
    public async Task DeleteTask_ShouldCallRepository()
    {
        int testTaskId = 1;
        var deletedTask = new TaskItem { Id = testTaskId };

        _repositoryMock.Setup(r => r.DeleteTask(testTaskId))
                      .ReturnsAsync(deletedTask);

        await _service.DeleteTask(testTaskId);

        _repositoryMock.Verify(r => r.DeleteTask(testTaskId), Times.Once);
    }

    [Fact]

    public async Task DeleteTask_WhenRepositoryThrows_ShouldLogError()
    {
        int testTaskId = 1;
        var exception = new Exception("Test exception");

        _repositoryMock.Setup(r => r.DeleteTask(testTaskId))
                     .ThrowsAsync(exception);
        await Assert.ThrowsAsync<Exception>(() => _service.DeleteTask(testTaskId));
    }
}