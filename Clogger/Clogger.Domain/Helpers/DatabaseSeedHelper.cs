using Clogger.Domain.Data.Database;
using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Clogger.Domain.Helpers
{
    public class DatabaseSeedHelper
    {
        public static async Task SeedDatabase(AppDbContext context, IEnvironmentalSettingHelper settingsHelper, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var testUser = new ApplicationUser
            {
                UserName = "test@test.com",
                FirstName = "Testy McTestFace",
                Email = "test@test.com",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(testUser, "Test123!");

            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create test user whilst seeding database! {string.Join(',', result.Errors)}");
            }

            //Collections

            var collection1 = context.Collections.Add(new Collection
            {
                CollectionName = "Cards",
                Description = "List of cards I own",
                UserId = testUser.Id
            });

            var collection2 = context.Collections.Add(new Collection
            {
                CollectionName = "Books",
                Description = "List of books I own",
                UserId = testUser.Id
            });

            await context.SaveChangesAsync();

            // Collection items for a regular collection

            await context.CollectionItems.AddAsync(new CollectionItem
            {
                CollectionId = collection1.Entity.Id,
                ItemName = "Charizard",
                ItemDescription = "Charizard from base set",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = testUser.Id
            });

            await context.CollectionItems.AddAsync(new CollectionItem
            {
                CollectionId = collection1.Entity.Id,
                ItemName = "Blastoise",
                ItemDescription = "Blastoise from base set",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = testUser.Id
            });

            await context.SaveChangesAsync();

            Log.Information("Database seeding completed");
        }
    }
}
