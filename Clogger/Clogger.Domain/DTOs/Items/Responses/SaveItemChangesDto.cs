namespace Clogger.Domain.DTOs.Items.Responses
{
    public class SaveItemChangesDto
    {
        public required int ItemId { get; set; }
        public required int CollectionId { get; set; }
    }
}
