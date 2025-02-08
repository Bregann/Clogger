using Clogger.Domain.Data.Database;
using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Collections.Requests;
using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Collection = Clogger.Domain.DTOs.Collections.Responses.Collection;
using CollectionItem = Clogger.Domain.DTOs.Collections.Responses.CollectionItem;

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
                CustomFieldNames = collection.CustomCollectionFields.Select(x => new CustomFieldNames { FieldName = x.FieldName, Id = x.Id }).ToArray()
            };
        }

        public async Task<int> AddNewCollection(User user, AddCollectionRequest dto)
        {
            if (_context.Collections.Any(x => x.CollectionName.ToLower().Trim() == dto.CollectionName.ToLower().Trim() && x.UserId == user.Id))
            {
                throw new DuplicateNameException("Collection with this name already exists");
            }

            var collection = new Database.Models.Collection
            {
                CollectionName = dto.CollectionName.Trim(),
                Description = dto.CollectionDescription.Trim(),
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            await _context.Collections.AddAsync(collection);

            if (dto.CustomFieldNames != null)
            {
                _context.CustomCollectionFields.AddRange(dto.CustomFieldNames.Select(x => new CustomCollectionField
                {
                    FieldName = x.Trim(),
                    Collection = collection
                }));
            }

            await _context.SaveChangesAsync();

            return collection.Id;
        }

        public async Task SaveCollectionChanges(User user, SaveCollectionChangesRequest dto)
        {
            if (!_context.Collections.Any(x => x.Id == dto.CollectionId && x.UserId == user.Id))
            {
                throw new KeyNotFoundException("Collection not found");
            }

            if (_context.Collections.Any(x => x.CollectionName.ToLower().Trim() == dto.CollectionName.ToLower().Trim() && x.UserId == user.Id && x.Id != dto.CollectionId))
            {
                throw new DuplicateNameException("Collection with this name already exists");
            }

            await _context.Collections
                .Where(x => x.Id == dto.CollectionId && user.Id == x.UserId)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(x => x.CollectionName, dto.CollectionName.Trim())
                    .SetProperty(x => x.Description, dto.CollectionDescription.Trim())
                    .SetProperty(x => x.UpdatedAt, DateTime.UtcNow)
            );

            foreach (var customField in dto.CustomFieldNames)
            {
                if (customField.Id == -1)
                {
                    await _context.CustomCollectionFields.AddAsync(new CustomCollectionField
                    {
                        FieldName = customField.FieldName.Trim(),
                        CollectionId = dto.CollectionId
                    });

                    continue;
                }

                await _context.CustomCollectionFields.Where(x => x.Id == customField.Id && x.Collection.UserId == user.Id)
                    .ExecuteUpdateAsync(setters => setters
                        .SetProperty(x => x.FieldName, customField.FieldName.Trim())
                    );
            }

            await _context.SaveChangesAsync();
        }

        public async Task<GetCollectionDropdownValuesDto> GetCollectionDropdownValues(string userId)
        {
            var collectionItems = await _context.Collections.Where(x => x.UserId == userId).Select(x => new LabelValue
            {
                Value = x.Id.ToString(),
                Label = x.CollectionName
            }).ToArrayAsync();

            return new GetCollectionDropdownValuesDto
            {
                Collections = collectionItems
            };
        }

        public async Task<GetCustomCollectionFieldsDto> GetCustomCollectionFields(string userId, int collectionId)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(x => x.Id == collectionId && x.UserId == userId);

            if (collection == null)
            {
                throw new KeyNotFoundException("Collection not found");
            }

            return new GetCustomCollectionFieldsDto
            {
                CustomFields = collection.CustomCollectionFields.Select(x => new CustomCollectionField { FieldName = x.FieldName, Id = x.Id }).ToArray()
            };
        }
    }
}
