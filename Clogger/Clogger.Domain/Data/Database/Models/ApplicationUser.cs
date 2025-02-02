using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Clogger.Domain.Data.Database.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string FirstName { get; set; } = "";
    }
}
