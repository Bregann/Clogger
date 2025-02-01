using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly ICollectionService _collectionService;
        private readonly UserManager<AppUser> _userManager;

        public CollectionsController(ICollectionService collectionService, UserManager<AppUser> userManager)
        {
            _collectionService = collectionService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<GetCollectionsDto>> GetCollections()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _collectionService.GetCollections(user.Id);

            return Ok(result);
        }
    }
}
