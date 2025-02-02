using Clogger.Domain.Data.Database;
using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Home.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.EntityFrameworkCore;

namespace Clogger.Domain.Data.Services
{
    public class HomeService(AppDbContext dbContext) : IHomeService
    {
        private readonly AppDbContext _context = dbContext;

        public async Task<GetUserHeaderStatsDto> GetUserHeaderStats(User user)
        {
            return new GetUserHeaderStatsDto
            {
                TotalCollections = await _context.Collections.CountAsync(x => x.UserId == user.Id),
                TotalItems = await _context.CollectionItems.CountAsync(x => x.UserId == user.Id),
                UserFirstName = user.FirstName
            };
        }
    }
}
