using Clogger.Domain.Data.Database.Context;
using Clogger.Domain.DTOs.Search.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.EntityFrameworkCore;

namespace Clogger.Domain.Data.Services
{
    public class SearchService(AppDbContext context) : ISearchService
    {
        private readonly AppDbContext _context = context;

        public async Task<SearchResultsDto> Search(string query, string userId)
        {
            var items = await _context.CollectionItems
                .Where(x => (x.ItemName.ToLower().Contains(query) || x.ItemDescription.ToLower().Contains(query)) && x.UserId == userId)
                .Select(x => new SearchItemDto
                {
                    ItemId = x.Id,
                    ItemName = x.ItemName,
                    ItemDescription = x.ItemDescription,
                    CollectionName = x.Collection.CollectionName
                })
                .ToArrayAsync();

            var collections = await _context.Collections
                .Where(x => (x.CollectionName.ToLower().Contains(query) || x.Description.ToLower().Contains(query)) && x.UserId == userId)
                .Select(x => new SearchCollectionDto
                {
                    CollectionId = x.Id,
                    CollectionName = x.CollectionName,
                    CollectionDescription = x.Description,
                    CollectionItemCount = x.CollectionItems.Count
                })
                .ToArrayAsync();

            return new SearchResultsDto
            {
                TotalResults = items.Length + collections.Length,
                Items = items,
                Collections = collections
            };
        }
    }
}
