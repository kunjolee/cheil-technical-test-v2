namespace TaskManagementApp.Models;
using System.ComponentModel.DataAnnotations;

public class TaskItem
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public bool IsCompleted { get; set; } = false;
}
