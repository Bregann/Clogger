using Clogger.Domain.Data.Database;
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

            var imageBase64 = "";
            var mimeType = "";
            if (!string.IsNullOrEmpty(item.PictureUrl))
            {
#if DEBUG
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), item.PictureUrl);
#else
                var imagePath = Path.Combine($"/app/Images/{userId}", item.PictureUrl);
#endif
                var extension = Path.GetExtension(imagePath).ToLower();

                switch (extension)
                {
                    case ".jpg":
                    case ".jpeg":
                        mimeType = "image/jpeg";
                        break;
                    case ".png":
                        mimeType = "image/png";
                        break;
                    case ".gif":
                        mimeType = "image/gif";
                        break;
                    default:
                        mimeType = "application/octet-stream";
                        break;
                }

                using (var stream = new FileStream(imagePath, FileMode.Open))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await stream.CopyToAsync(memoryStream);
                        var base64String = Convert.ToBase64String(memoryStream.ToArray());
                        imageBase64 = $"data:{mimeType};base64,{base64String}";
                    }
                }
            }

            return new GetItemDto
            {
                Id = item.Id,
                ItemName = item.ItemName,
                ItemDescription = item.ItemDescription,
                ImageUrl = string.IsNullOrEmpty(imageBase64) ? null : imageBase64,
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
                imageName = await SaveImage(image);
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

        public async Task<GetEditItemPropertiesDto> GetEditItemProperties(int itemId, string userId)
        {
            var item = await _context.CollectionItems.FirstOrDefaultAsync(x => x.Id == itemId && x.UserId == userId) ?? throw new KeyNotFoundException("Item not found");

            var customFields = await (from field in _context.CustomCollectionFields
                                      join value in _context.CustomCollectionFieldsValues
                                      on field.Id equals value.CustomCollectionFieldId into fieldValues
                                      from value in fieldValues.Where(v => v.CollectionItemId == itemId).DefaultIfEmpty()
                                      select new CustomFieldDataValueId
                                      {
                                          FieldId = field.Id,
                                          FieldName = field.FieldName,
                                          FieldValue = value != null ? value.FieldValue : null
                                      }).ToArrayAsync();

            return new GetEditItemPropertiesDto
            {
                ItemId = item.Id,
                CollectionId = item.CollectionId,
                ItemName = item.ItemName,
                ItemDescription = item.ItemDescription,
                CustomFields = customFields,
                HasImage = !string.IsNullOrEmpty(item.PictureUrl)
            };
        }

        public async Task<SaveItemChangesDto> SaveItemChanges(IFormFile? image, int itemId, string itemName, string itemDescription, CustomFieldData[]? customFields, string userId)
        {
            var item = await _context.CollectionItems.FirstOrDefaultAsync(x => x.Id == itemId && x.UserId == userId) ?? throw new KeyNotFoundException("Item not found");

            item.ItemName = itemName;
            item.ItemDescription = itemDescription;

            if (item.PictureUrl != null && image != null)
            {
#if DEBUG
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), item.PictureUrl);
#else
                var imagePath = Path.Combine($"/app/Images/{userId}", item.PictureUrl);
#endif
                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                }

                item.PictureUrl = null;
            }

            if (image != null)
            {
                var imageName = await SaveImage(image);
                item.PictureUrl = imageName;
            }

            item.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            if (customFields != null)
            {
                foreach (var field in customFields)
                {
                    var customFieldValue = await _context.CustomCollectionFieldsValues.FirstOrDefaultAsync(x => x.CollectionItemId == itemId && x.CustomCollectionFieldId == field.FieldId);

                    if (customFieldValue == null)
                    {
                        customFieldValue = new Database.Models.CustomCollectionFieldValue
                        {
                            CollectionItemId = item.Id,
                            CustomCollectionFieldId = field.FieldId,
                            FieldValue = field.FieldValue
                        };

                        await _context.CustomCollectionFieldsValues.AddAsync(customFieldValue);
                    }
                    else
                    {
                        customFieldValue.FieldValue = field.FieldValue;
                    }
                }

                await _context.SaveChangesAsync();
            }

            return new SaveItemChangesDto
            {
                ItemId = item.Id,
                CollectionId = item.CollectionId
            };
        }

        public async Task DeleteItem(int itemId, string userId)
        {
            var rowsChanged = await _context.CollectionItems.Where(x => x.Id == itemId && x.UserId == userId).ExecuteDeleteAsync();

            if (rowsChanged == 0)
            {
                throw new KeyNotFoundException("Item not found");
            }
        }

        private static async Task<string> SaveImage(IFormFile image)
        {
            var imageName = "";
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
            return imageName;
        }
    }
}
