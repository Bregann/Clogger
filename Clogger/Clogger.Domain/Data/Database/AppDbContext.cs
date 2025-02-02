using Clogger.Domain.Data.Database.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Clogger.Domain.Data.Database
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<EnvironmentalSetting> EnvironmentalSettings { get; set; } = null!;
        public DbSet<Collection> Collections { get; set; } = null!;
        public DbSet<CollectionItem> CollectionItems { get; set; } = null!;
        public DbSet<CustomCollectionField> CustomCollectionFields { get; set; } = null!;
        public DbSet<CustomCollectionFieldValue> CustomCollectionFieldsValues { get; set; } = null!;
    }
}
