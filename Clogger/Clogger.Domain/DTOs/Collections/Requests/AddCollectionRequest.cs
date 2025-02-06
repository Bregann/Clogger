using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Collections.Requests
{
    public class AddCollectionRequest
    {
        public required string CollectionName { get; set; }
        public required string CollectionDescription { get; set; }
        public string[]? CustomFieldNames { get; set; }
    }
}
