using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Collections.Requests;
using Clogger.Domain.DTOs.Collections.Responses;

namespace Clogger.Domain.Interfaces.Api
{
    public interface ICollectionService
    {
        Task<GetCollectionsDto> GetCollections(string userId);
        Task<GetCollectionItemsDto> GetCollectionItems(string userId, int collectionId);
        Task<GetEditCollectionDataDto> GetEditCollectionData(string userId, int collectionId);
        Task<int> AddNewCollection(User user, AddCollectionRequest dto);
        Task SaveCollectionChanges(User user, SaveCollectionChangesRequest dto);
        Task<GetCollectionDropdownValuesDto> GetCollectionDropdownValues(string userId);
        Task<GetCustomCollectionFieldsDto> GetCustomCollectionFields(string userId, int collectionId);
    }
}
