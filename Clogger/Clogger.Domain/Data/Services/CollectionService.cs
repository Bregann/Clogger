using Clogger.Domain.Data.Database;
using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.EntityFrameworkCore;
using Npgsql.PostgresTypes;

namespace Clogger.Domain.Data.Services
{
    public class CollectionService(AppDbContext dbContext) : ICollectionService
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

        public async Task<GetCollectionItemsDto> GetCollectionItems(string userId, int collectionId)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(x => x.Id == collectionId && x.UserId == userId);

            if (collection == null)
            {
                throw new KeyNotFoundException("Collection not found");
            }

            return new GetCollectionItemsDto
            {
                Id = collection.Id,
                CollectionName = collection.CollectionName,
                CollectionDescription = collection.Description,
                CollectionItems = collection.CollectionItems.Select(x => new CollectionItem
                {
                    Id = x.Id,
                    ItemName = x.ItemName,
                    ItemDescription = x.ItemDescription
                }).ToArray()
            };
        }

        public async Task<GetEditCollectionDataDto> GetEditCollectionData(string userId, int collectionId)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(x => x.Id == collectionId && x.UserId == userId);

            if (collection == null)
            {
                throw new KeyNotFoundException("Collection not found");
            }

            return new GetEditCollectionDataDto
            {
                CollectionName = collection.CollectionName,
                CollectionDescription = collection.Description,
                CustomFieldNames = collection.CustomCollectionFields.Select(x => new CustomFieldNames { FieldName = x.FieldName, Id = x.Id}).ToArray()
            };
        }

        public async Task AddOrEditCollection(string userId, AddOrEditCollectionRequest dto)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(x => x.Id == dto.Id && x.UserId == userId);
            if (collection == null)
            {
                collection = new Collection
                {
                    UserId = userId
                };
                _context.Collections.Add(collection);
            }
            collection.CollectionName = dto.CollectionName;
            collection.Description = dto.CollectionDescription;
            await _context.SaveChangesAsync();
        }
    }
}
