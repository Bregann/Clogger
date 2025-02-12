using Clogger.Domain.Data.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Clogger.Domain.Data.Database.Context
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; } = null!;
        public DbSet<EnvironmentalSetting> EnvironmentalSettings { get; set; } = null!;
        public DbSet<Collection> Collections { get; set; } = null!;
        public DbSet<CollectionItem> CollectionItems { get; set; } = null!;
        public DbSet<CustomCollectionField> CustomCollectionFields { get; set; } = null!;
        public DbSet<CustomCollectionFieldValue> CustomCollectionFieldsValues { get; set; } = null!;
    }
}
