using Microsoft.EntityFrameworkCore;

namespace Clogger.Domain.Data.Database.Context
{
    public class PostgresqlContext : AppDbContext
    {
        public PostgresqlContext(DbContextOptions<PostgresqlContext> options) : base(options) { }

    }
}
