using Clogger.Domain.DTOs.Items.Responses;
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
    }
}
