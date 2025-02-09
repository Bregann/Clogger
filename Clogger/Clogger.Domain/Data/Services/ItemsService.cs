using Clogger.Domain.Data.Database;
using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.DTOs.Items.Requests;
using Clogger.Domain.DTOs.Items.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Clogger.Domain.Data.Services
{
    public class ItemsService(AppDbContext dbContext) : IItemsService
    {
        private readonly AppDbContext _context = dbContext;

        public async Task<GetItemDto> GetItem(int itemId, string userId)
        {
            var item = await _context.CollectionItems.FirstOrDefaultAsync(x => x.Id == itemId && x.UserId == userId);

            if (item == null)
            {
                throw new KeyNotFoundException("Item not found");
            }

            return new GetItemDto
            {
                Id = item.Id,
                ItemName = item.ItemName,
                ItemDescription = item.ItemDescription,
                ImageUrl = item.PictureUrl,
                DateAdded = item.CreatedAt.ToString("yyyy-MM-dd"),
                LastUpdated = item.UpdatedAt.ToString("yyyy-MM-dd"),
                CustomFields = item.CustomCollectionFieldValues.Select(x => new CustomField
                {
                    FieldName = x.CustomCollectionField.FieldName,
                    FieldValue = x.FieldValue
                }).ToArray()
            };
        }

        public async Task<int> AddItem(IFormFile? image, int collectionId, string itemName, string? itemDescription, CustomFieldData[]? customFields, string userId)
        {
            if (!_context.Collections.Any(x => x.Id == collectionId && x.UserId == userId))
            {
               throw new KeyNotFoundException("Collection not found");
            }

            var imageName = "";

            if (image != null)
            {
                imageName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
#if DEBUG
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), imageName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
#else
                if(!Directory.Exists($"/app/Images/{userId}"))
                {
                    Directory.CreateDirectory($"/app/Images/{userId}");
                }

                var imagePath = Path.Combine($"/app/Images/{userId}", imageName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
#endif
            }

            var item = new Database.Models.CollectionItem
            {
                CollectionId = collectionId,
                ItemName = itemName,
                ItemDescription = itemDescription ?? "",
                PictureUrl = string.IsNullOrEmpty(imageName) ? null : imageName,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = userId
            };

            await _context.CollectionItems.AddAsync(item);

            await _context.SaveChangesAsync();

            if (customFields != null)
            {
                foreach (var field in customFields)
                {
                    var customField = await _context.CustomCollectionFields.FirstOrDefaultAsync(x => x.Id == field.FieldId && x.CollectionId == collectionId) ?? throw new KeyNotFoundException("Custom field not found");

                    var customFieldValue = new Database.Models.CustomCollectionFieldValue
                    {
                        CollectionItemId = item.Id,
                        CustomCollectionFieldId = field.FieldId,
                        FieldValue = field.FieldValue
                    };

                    await _context.CustomCollectionFieldsValues.AddAsync(customFieldValue);
                }
                await _context.SaveChangesAsync();
            }

            return item.Id;
        }
    }
}
