using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly ICollectionService _collectionService;
        private readonly IUserContextHelper _userContextHelper;

        public CollectionsController(ICollectionService collectionService, IUserContextHelper userContextHelper)
        {
            _collectionService = collectionService;
            _userContextHelper = userContextHelper;
        }

        [HttpGet]
        public async Task<ActionResult<GetCollectionsDto>> GetCollections()
        {
            var user = _userContextHelper.GetUserId();

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _collectionService.GetCollections(user);

            return Ok(result);
        }

        [HttpGet("{collectionId}")]
        public async Task<ActionResult<GetCollectionItemsDto>> GetCollectionItems([FromRoute] int collectionId)
        {
            var user = _userContextHelper.GetUserId();

            if (user == null)
            {
                return Unauthorized();
            }

            try
            {
                var result = await _collectionService.GetCollectionItems(user, collectionId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
