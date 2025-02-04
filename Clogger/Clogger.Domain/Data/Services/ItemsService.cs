using Clogger.Domain.Data.Database;
using Clogger.Domain.DTOs.Items.Responses;
using Clogger.Domain.Interfaces.Api;
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
    }
}
