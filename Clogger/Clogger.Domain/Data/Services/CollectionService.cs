using Clogger.Domain.Data.Database;
using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.Data.Services
{
    public class CollectionService (AppDbContext dbContext) : ICollectionService
    {
        private readonly AppDbContext _context = dbContext;

        public async Task<GetCollectionsDto> GetCollections(string userId)
        {
            return new GetCollectionsDto
            {
                Collections = await _context.Collections
                    .Where(x => x.UserId == userId)
                    .Select(x => new Collection
                    {
                        Id = x.Id,
                        CollectionName = x.CollectionName,
                        CollectionDescription = x.Description,
                        CollectionItemCount = x.CollectionItems.Count
                    })
                    .ToArrayAsync()
            };
        }
    }
}
