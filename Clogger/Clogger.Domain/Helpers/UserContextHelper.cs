using Clogger.Domain.Data.Database.Context;
using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Clogger.Domain.Helpers
{
    public class UserContextHelper(IHttpContextAccessor httpContextAccessor, AppDbContext context) : IUserContextHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly AppDbContext _context = context;

        public string GetUserId()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        }

        public string GetUserFirstName()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name)!.Value;
        }

        public User GetUser()
        {
            var userId = GetUserId();
            return _context.Users.Find(userId)!;
        }
    }
}