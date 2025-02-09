namespace Clogger.Domain.DTOs.Items.Responses
{
    public class GetItemDto
    {
        public required int Id { get; set; }
        public required string ItemName { get; set; }
        public required string ItemDescription { get; set; }
        public string? ImageUrl { get; set; }
        public required string DateAdded { get; set; }
        public required string LastUpdated { get; set; }
        public CustomField[] CustomFields { get; set; } = [];
    }

    public class CustomField
    {
        public required string FieldName { get; set; }
        public required string FieldValue { get; set; }
    }
}
