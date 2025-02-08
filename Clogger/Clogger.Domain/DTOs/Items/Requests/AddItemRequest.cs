using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Items.Requests
{
    public class CustomFieldData
    {
        public required int FieldId { get; set; }
        public required string FieldValue { get; set; }
    }
}