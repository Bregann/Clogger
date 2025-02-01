using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Collections.Responses
{
    public class GetCollectionsDto
    {
        public required Collection[] Collections { get; set; }
    }

    public class Collection
    {
        public required int Id { get; set; }
        public required string CollectionName { get; set; }
        public required string CollectionDescription { get; set; }
        public required int CollectionItemCount { get; set; }
    }
}
