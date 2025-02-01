using Clogger.Domain.DTOs.Collections.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.Interfaces.Api
{
    public interface ICollectionService
    {
        Task<GetCollectionsDto> GetCollections(string userId);
    }
}
