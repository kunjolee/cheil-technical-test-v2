using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using TaskManagementApp.Controllers;
using TaskManagementApp.Models;
using TaskManagementApp.Repositories;
using TaskManagementApp.Services;
using Xunit;

namespace TaskManagementApp.Tests.Controllers;

public class TasksControllerTests
{
    private readonly Mock<ITaskRepository> _repositoryMock;
    private readonly TaskService _taskService;
    private readonly TasksController _controller;
    private readonly Mock<ILogger<TasksController>> _loggerMock;

    public TasksControllerTests()
    {
        _repositoryMock = new Mock<ITaskRepository>();
        var loggerServiceMock = new Mock<ILogger<TaskService>>();
        _taskService = new TaskService(_repositoryMock.Object, loggerServiceMock.Object);
        _loggerMock = new Mock<ILogger<TasksController>>();
        _controller = new TasksController(_taskService, _loggerMock.Object);
    }

    #region GetAllTasks Tests
    [Fact]
    public async Task GetAllTasks_ReturnsOkResult_WithListOfTasks()
    {
        var testTasks = new List<TaskItem>
    {
        new TaskItem { Id = 1, Title = "Task 1" },
        new TaskItem { Id = 2, Title = "Task 2" }
    };

        _repositoryMock.Setup(x => x.GetAllTasks())
                     .ReturnsAsync(testTasks);

        var result = await _controller.GetAllTasks();

        var actionResult = Assert.IsType<ActionResult<IEnumerable<TaskItem>>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var returnValue = Assert.IsAssignableFrom<IEnumerable<TaskItem>>(okResult.Value);
        Assert.Equal(2, returnValue.Count());
    }

    [Fact]
    public async Task GetAllTasks_Returns500_WhenServiceThrowsException()
    {
        _repositoryMock.Setup(x => x.GetAllTasks())
                     .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetAllTasks();

        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, objectResult.StatusCode);
        Assert.Equal("Error retrieving tasks", objectResult.Value);

        VerifyErrorLogged("Error getting all tasks");
    }
    #endregion

    #region GetTask Tests
    [Fact]
    public async Task GetTask_ReturnsTask_WhenExists()
    {
        var testTask = new TaskItem { Id = 1, Title = "Test Task" };
        _repositoryMock.Setup(x => x.GetTaskById(1))
                     .ReturnsAsync(testTask);

        var result = await _controller.GetTask(1);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        Assert.Equal(testTask, okResult.Value);
    }

    [Fact]
    public async Task GetTask_ReturnsNotFound_WhenNotExists()
    {
        _repositoryMock.Setup(x => x.GetTaskById(1))
                     .ReturnsAsync((TaskItem?)null);

        var result = await _controller.GetTask(1);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        Assert.IsType<NotFoundResult>(actionResult.Result);
    }

    [Fact]
    public async Task GetTask_Returns500_WhenServiceThrowsException()
    {
        _repositoryMock.Setup(x => x.GetTaskById(1))
                     .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetTask(1);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
        Assert.Equal(500, objectResult.StatusCode);
        Assert.Equal("Error retrieving task with ID 1", objectResult.Value);

        VerifyErrorLogged("Error getting task with ID 1");
    }
    #endregion

    #region CreateTask Tests
    [Fact]
    public async Task CreateTask_ReturnsCreated_WithTask()
    {
        var newTask = new TaskItem { Title = "New Task" };
        var createdTask = new TaskItem { Id = 1, Title = "New Task" };

        _repositoryMock.Setup(x => x.AddTask(newTask))
                     .ReturnsAsync(createdTask);

        var result = await _controller.CreateTask(newTask);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);

        Assert.Equal(nameof(TasksController.GetTask), createdAtActionResult.ActionName);
        Assert.Equal(createdTask, createdAtActionResult.Value);
        Assert.NotNull(createdAtActionResult.RouteValues);
        Assert.True(createdAtActionResult.RouteValues!.ContainsKey("id"));
        Assert.Equal(1, createdAtActionResult.RouteValues["id"]);
    }

    [Fact]
    public async Task CreateTask_ReturnsBadRequest_WhenModelInvalid()
    {
        var invalidTask = new TaskItem();
        _controller.ModelState.AddModelError("Title", "Title is required");

        var result = await _controller.CreateTask(invalidTask);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);
        Assert.IsType<SerializableError>(badRequestResult.Value);
    }

    [Fact]
    public async Task CreateTask_ReturnsBadRequest_WhenArgumentException()
    {
        var newTask = new TaskItem { Title = "New Task" };
        _repositoryMock.Setup(x => x.AddTask(newTask))
                     .ThrowsAsync(new ArgumentException("Invalid data"));

        var result = await _controller.CreateTask(newTask);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);
        Assert.Equal("Invalid data", badRequestResult.Value);
    }

    [Fact]
    public async Task CreateTask_Returns500_WhenServiceThrowsException()
    {
        var newTask = new TaskItem { Title = "New Task" };
        _repositoryMock.Setup(x => x.AddTask(newTask))
                     .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.CreateTask(newTask);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
        Assert.Equal(500, objectResult.StatusCode);
        Assert.Equal("Error creating task", objectResult.Value);

        VerifyErrorLogged("Error creating new task");
    }
    #endregion

    #region MarkTaskAsCompleted Tests
    [Fact]
    public async Task MarkTaskAsCompleted_ReturnsNoContent_WhenSuccess()
    {
        var taskToComplete = new TaskItem { Id = 1, IsCompleted = true };
        _repositoryMock.Setup(x => x.MarkTaskAsCompleted(1))
                     .ReturnsAsync(taskToComplete);

        var result = await _controller.MarkTaskAsCompleted(1);

        Assert.IsType<NoContentResult>(result);
        _repositoryMock.Verify(x => x.MarkTaskAsCompleted(1), Times.Once);
    }

    [Fact]
    public async Task MarkTaskAsCompleted_ReturnsNotFound_WhenTaskNotExists()
    {
        _repositoryMock.Setup(x => x.MarkTaskAsCompleted(1))
                     .ThrowsAsync(new KeyNotFoundException());

        var result = await _controller.MarkTaskAsCompleted(1);

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task MarkTaskAsCompleted_Returns500_WhenServiceThrowsException()
    {
        _repositoryMock.Setup(x => x.MarkTaskAsCompleted(1))
                     .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.MarkTaskAsCompleted(1);

        var objectResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, objectResult.StatusCode);
        Assert.Equal("Error marking task with ID 1 as completed", objectResult.Value);

        VerifyErrorLogged("Error marking task with ID 1 as completed");
    }
    #endregion

    #region DeleteTask Tests
    [Fact]
    public async Task DeleteTask_ReturnsNoContent_WhenSuccess()
    {
        var taskToDelete = new TaskItem { Id = 1 };
        _repositoryMock.Setup(x => x.DeleteTask(1))
                     .ReturnsAsync(taskToDelete);

        var result = await _controller.DeleteTask(1);

        Assert.IsType<NoContentResult>(result);
        _repositoryMock.Verify(x => x.DeleteTask(1), Times.Once);
    }

    [Fact]
    public async Task DeleteTask_ReturnsNotFound_WhenTaskNotExists()
    {
        _repositoryMock.Setup(x => x.DeleteTask(1))
                     .ThrowsAsync(new KeyNotFoundException());

        var result = await _controller.DeleteTask(1);

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteTask_Returns500_WhenServiceThrowsException()
    {
        _repositoryMock.Setup(x => x.DeleteTask(1))
                     .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.DeleteTask(1);

        var objectResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, objectResult.StatusCode);
        Assert.Equal("Error deleting task with ID 1", objectResult.Value);

        VerifyErrorLogged("Error deleting task with ID 1");
    }
    #endregion

    private void VerifyErrorLogged(string errorMessage)
    {
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString()!.Contains(errorMessage)),
                It.IsAny<Exception?>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }
}