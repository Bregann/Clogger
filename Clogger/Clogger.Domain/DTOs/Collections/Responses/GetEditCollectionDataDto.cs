using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Collections.Responses
{
    public class GetEditCollectionDataDto
    {
        public required string CollectionName { get; set; }
        public required string CollectionDescription { get; set; }
        public required CustomFieldNames[] CustomFieldNames { get; set; }
    }

    public class CustomFieldNames
    {
        public required int Id { get; set; }
        public required string FieldName { get; set; }
    }
}
