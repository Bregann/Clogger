using Clogger.Domain.DTOs.Search.Responses;

namespace Clogger.Domain.Interfaces.Api
{
    public interface ISearchService
    {
        Task<SearchResultsDto> Search(string query, string userId);
    }
}
