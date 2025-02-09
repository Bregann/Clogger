using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.DTOs.Items.Requests;
using Clogger.Domain.DTOs.Items.Responses;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.Interfaces.Api
{
    public interface IItemsService
    {
        Task<GetItemDto> GetItem(int itemId, string userId);
        Task<int> AddItem(IFormFile? image, int collectionId, string itemName, string? itemDescription, CustomFieldData[]? customFields, string userId);
    }
}
