using Microsoft.EntityFrameworkCore;

namespace TaskManagementApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<TaskManagementApp.Models.Task> Tasks { get; set; }
}