using Clogger.Domain.Data.Database.Models;

namespace Clogger.Domain.DTOs.Collections.Responses
{
    public class GetCustomCollectionFieldsDto
    {
        public required CustomCollectionField[] CustomFields { get; set; }
    }
}
