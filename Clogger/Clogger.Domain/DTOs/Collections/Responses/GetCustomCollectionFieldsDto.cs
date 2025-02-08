using Clogger.Domain.Data.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Collections.Responses
{
    public class GetCustomCollectionFieldsDto
    {
        public required CustomCollectionField[] CustomFields { get; set; }
    }
}
