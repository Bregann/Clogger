using Clogger.Domain.Data.Database;
using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Auth.Requests;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Clogger.Domain.Helpers
{
    public class DatabaseSeedHelper
    {
        public static async Task SeedDatabase(AppDbContext context, IEnvironmentalSettingHelper settingsHelper, IServiceProvider serviceProvider)
        {
            var registrationService = serviceProvider.GetRequiredService<IAuthService>();

            try
            {
                await registrationService.RegisterUser(new RegisterUserRequest
                {
                    Username = "testuser",
                    Password = "password",
                    FirstName = "Testy McTestFace",
                    Email = "test@test.com"
                });
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Failed to add new user in database seed method");
                throw;
            }

            //Collections
            var testUser = await context.Users.FirstAsync(x => x.Username == "testuser");

            var collection1 = new Collection
            {
                CollectionName = "Cards",
                Description = "List of cards I own",
                UserId = testUser.Id
            };

            var collection2 = new Collection
            {
                CollectionName = "Books",
                Description = "List of books I own",
                UserId = testUser.Id
            };

            context.Collections.Add(collection1);
            context.Collections.Add(collection2);

            await context.SaveChangesAsync();

            // Collection items for a regular collection

            await context.CollectionItems.AddAsync(new CollectionItem
            {
                CollectionId = collection1.Id,
                ItemName = "Charizard",
                ItemDescription = "Charizard from base set",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                UserId = testUser.Id
            });

            await context.CollectionItems.AddAsync(new CollectionItem
            {
                CollectionId = collection1.Id,
                ItemName = "Blastoise",
                ItemDescription = "Blastoise from base set",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                UserId = testUser.Id
            });

            await context.SaveChangesAsync();

            Log.Information("Database seeding completed");
        }
    }
}