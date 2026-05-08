
using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

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
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000","https://localhost:3000"));
app.MapControllers();

app.Run();
