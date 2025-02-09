using Clogger.Domain.DTOs.Items.Requests;
using Clogger.Domain.DTOs.Items.Responses;
using Microsoft.AspNetCore.Http;

namespace Clogger.Domain.Interfaces.Api
{
    public interface IItemsService
    {
        Task<GetItemDto> GetItem(int itemId, string userId);
        Task<int> AddItem(IFormFile? image, int collectionId, string itemName, string? itemDescription, CustomFieldData[]? customFields, string userId);
        Task<GetEditItemPropertiesDto> GetEditItemProperties(int itemId, string userId);
        Task<SaveItemChangesDto> SaveItemChanges(IFormFile? image, int itemId, string itemName, string itemDescription, CustomFieldData[]? customFields, string userId);
        Task DeleteItem(int itemId, string userId);
    }
}
