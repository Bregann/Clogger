namespace Clogger.Domain.DTOs.Collections.Responses
{
    public class GetCollectionItemsDto
    {
        public required int Id { get; set; }
        public required string CollectionName { get; set; }
        public required string CollectionDescription { get; set; }
        public required CollectionItem[] CollectionItems { get; set; }
    }

    public class CollectionItem
    {
        public required int Id { get; set; }
        public required string ItemName { get; set; }
        public required string ItemDescription { get; set; }
    }
}
