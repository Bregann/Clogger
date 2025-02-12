using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.Data.Database.Context
{
    public class SqliteContext : AppDbContext
    {
        public SqliteContext(DbContextOptions<SqliteContext> options) : base(options) { }
    }
}
