
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// --- ADD THIS SECTION ---
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    // This applies any pending migrations and creates the DB if it doesn't exist
    await context.Database.MigrateAsync();
    
    // Optional: If you have a Seed class to populate initial data
    // await Seed.SeedData(context); 
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}




// Configure the HTTP request pipeline.

app.MapControllers();

app.Run();
