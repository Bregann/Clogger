using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Collections.Responses
{
    public class GetCollectionDropdownValuesDto
    {
        public required LabelValue[] Collections { get; set; }
    }

    public class LabelValue
    {
        public required string Label { get; set; }
        public required string Value { get; set; }
    }
}
