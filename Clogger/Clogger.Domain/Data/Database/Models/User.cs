using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Clogger.Domain.Data.Database.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string FirstName { get; set; } = "";
    }
}
