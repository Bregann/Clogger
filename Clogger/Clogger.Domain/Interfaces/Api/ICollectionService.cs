using Clogger.Domain.DTOs.Collections.Responses;

namespace Clogger.Domain.Interfaces.Api
{
    public interface ICollectionService
    {
        Task<GetCollectionsDto> GetCollections(string userId);
        Task<GetCollectionItemsDto> GetCollectionItems(string userId, int collectionId);
    }
}
