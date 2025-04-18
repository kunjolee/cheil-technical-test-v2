using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Models;
namespace TaskManagementApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks { get; set; }
}