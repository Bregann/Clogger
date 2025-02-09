namespace Clogger.Domain.DTOs.Items.Responses
{
    public class GetEditItemPropertiesDto
    {
        public required int ItemId { get; set; }
        public required int CollectionId { get; set; }
        public required string ItemName { get; set; }
        public required string ItemDescription { get; set; }
        public required CustomFieldDataValueId[] CustomFields { get; set; }
        public required bool HasImage { get; set; }
    }

    public class CustomFieldDataValueId
    {
        public required int FieldId { get; set; }
        public required string FieldName { get; set; }
        public string? FieldValue { get; set; }
    }
}
