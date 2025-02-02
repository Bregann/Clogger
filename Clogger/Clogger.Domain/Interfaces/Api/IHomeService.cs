using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Home.Responses;

namespace Clogger.Domain.Interfaces.Api
{
    public interface IHomeService
    {
        Task<GetUserHeaderStatsDto> GetUserHeaderStats(User user);
    }
}
