using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Home.Responses
{
    public class GetUserHeaderStatsDto
    {
        public required string UserFirstName { get; set; }
        public required int TotalCollections { get; set; }
        public required int TotalItems { get; set; }
    }
}
