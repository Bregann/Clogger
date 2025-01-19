using Clogger.Domain.Data.Database;
using Clogger.Domain.Interfaces.Api;
using Microsoft.EntityFrameworkCore;

namespace Clogger.Domain.Data.Services
{
    public class UserDataService(AppDbContext dbContext) : IUserDataService
    {
        private readonly AppDbContext _context = dbContext;

        public async Task<bool> SetUsername(string name, string userId)
        {
            var resultsUpdated = await _context.Users
                .Where(x => x.Id == userId)
                .ExecuteUpdateAsync(setters =>
                setters.SetProperty(x => x.UserName, name));

            return resultsUpdated > 0;
        }
    }
}
