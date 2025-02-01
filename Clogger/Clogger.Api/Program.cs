using Clogger.Domain.Data.Database;
using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.Data.Services;
using Clogger.Domain.Helpers;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add in our own services
builder.Services.AddSingleton<IEnvironmentalSettingHelper, EnvironmentalSettingHelper>();

builder.Services.AddScoped<IUserDataService, UserDataService>();
builder.Services.AddScoped<IHomeService, HomeService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add in identity
builder.Services.AddAuthorization();
builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);

builder.Services.AddIdentityCore<AppUser>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders()
    .AddApiEndpoints();

// Setup the database
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=" + Directory.GetCurrentDirectory() + "/application.db"));
}
else
{
    builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(Environment.GetEnvironmentVariable("xxxConnStringLive")));
}

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Seed the database
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetService<AppDbContext>()!;
        var settingsHelper = scope.ServiceProvider.GetRequiredService<IEnvironmentalSettingHelper>();

        await DatabaseSeedHelper.SeedDatabase(dbContext, settingsHelper);

        await dbContext.Database.MigrateAsync();
    }

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapIdentityApi<AppUser>();

app.MapControllers();

app.Run();