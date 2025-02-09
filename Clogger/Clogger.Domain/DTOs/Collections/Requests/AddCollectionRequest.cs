namespace Clogger.Domain.DTOs.Collections.Requests
{
    public class AddCollectionRequest
    {
        public required string CollectionName { get; set; }
        public required string CollectionDescription { get; set; }
        public string[]? CustomFieldNames { get; set; }
    }
}
