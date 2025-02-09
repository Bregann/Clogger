using Clogger.Domain.DTOs.Search.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.Interfaces.Api
{
    public interface ISearchService
    {
        Task<SearchResultsDto> Search(string query, string userId);
    }
}
