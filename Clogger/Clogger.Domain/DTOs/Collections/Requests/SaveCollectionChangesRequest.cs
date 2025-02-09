using Clogger.Domain.DTOs.Collections.Responses;

namespace Clogger.Domain.DTOs.Collections.Requests
{
    public class SaveCollectionChangesRequest
    {
        public required int CollectionId { get; set; }
        public required string CollectionName { get; set; }
        public required string CollectionDescription { get; set; }
        public required CustomFieldNames[] CustomFieldNames { get; set; }
    }
}
