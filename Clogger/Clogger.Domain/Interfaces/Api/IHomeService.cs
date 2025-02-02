using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Home.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.Interfaces.Api
{
    public interface IHomeService
    {
        Task<GetUserHeaderStatsDto> GetUserHeaderStats(ApplicationUser user);
    }
}
