namespace Clogger.Domain.DTOs.Search.Responses
{
    public class SearchResultsDto
    {
        public required int TotalResults { get; set; }
        public required SearchCollectionDto[] Collections { get; set; }
        public required SearchItemDto[] Items { get; set; }
    }

    public class SearchCollectionDto
    {
        public required int CollectionId { get; set; }
        public required string CollectionName { get; set; }
        public required string CollectionDescription { get; set; }
        public required int CollectionItemCount { get; set; }
    }

    public class SearchItemDto
    {
        public required int ItemId { get; set; }
        public required string ItemName { get; set; }
        public required string ItemDescription { get; set; }
        public required string CollectionName { get; set; }
    }
}
