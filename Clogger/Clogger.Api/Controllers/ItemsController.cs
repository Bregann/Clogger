using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.DTOs.Items.Requests;
using Clogger.Domain.DTOs.Items.Responses;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class ItemsController(IItemsService itemsService, IUserContextHelper userContextHelper) : ControllerBase
    {
        private readonly IItemsService _itemsService = itemsService;
        private readonly IUserContextHelper _userContextHelper = userContextHelper;

        [HttpGet("{itemId}")]
        public async Task<ActionResult<GetItemDto>> GetItem([FromRoute] int itemId)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _itemsService.GetItem(itemId, user);
                return Ok(result);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddItem(IFormFile? image, [FromForm] int collectionId, [FromForm] string itemName, [FromForm] string? itemDescription, [FromForm] CustomFieldData[]? customField)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _itemsService.AddItem(image, collectionId, itemName, itemDescription, customField, user);

                return Ok(result);
            }
            catch (KeyNotFoundException)
            {
                return BadRequest();
            }
        }
    }
}
