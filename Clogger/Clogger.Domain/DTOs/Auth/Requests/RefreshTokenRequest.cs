using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.DTOs.Auth.Requests
{
    public class RefreshTokenRequest
    {
        public required string RefreshToken { get; set; }
    }
}
