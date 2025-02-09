using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Items.Responses
{
    public class SaveItemChangesDto
    {
        public required int ItemId { get; set; }
        public required int CollectionId { get; set; }
    }
}
