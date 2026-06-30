using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;


public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
        
    }
    public required DbSet<Activity> Activities { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add your configuration here
            modelBuilder.Entity<Activity>()
                .Property(x => x.Id)
                // This ensures the DB generates the ID, and it's optimized for SQL Server performance
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<Activity>()
            .Property(x => x.Date)
            .HasDefaultValueSql("GETUTCDATE()")
            .ValueGeneratedOnAdd();

        }


}
