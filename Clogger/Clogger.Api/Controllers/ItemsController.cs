using Clogger.Domain.DTOs.Items.Requests;
using Clogger.Domain.DTOs.Items.Responses;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

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
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error getting item");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error getting item");
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddItem(IFormFile? image, [FromForm] int collectionId, [FromForm] string itemName, [FromForm] string itemDescription, [FromForm] CustomFieldData[]? customField)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _itemsService.AddItem(image, collectionId, itemName, itemDescription, customField, user);

                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error adding item");
                return BadRequest();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error adding item");
                return BadRequest();
            }
        }

        [HttpGet("{itemId}")]
        public async Task<ActionResult<GetEditItemPropertiesDto>> GetEditItemProperties([FromRoute] int itemId)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _itemsService.GetEditItemProperties(itemId, user);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error getting edit item properties");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error getting edit item properties");
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<SaveItemChangesDto>> SaveItemChanges(IFormFile? image, [FromForm] int itemId, [FromForm] string itemName, [FromForm] string itemDescription, [FromForm] CustomFieldData[]? customField)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _itemsService.SaveItemChanges(image, itemId, itemName, itemDescription, customField, user);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error saving item changes");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error saving item changes");
                return BadRequest();
            }
        }

        [HttpDelete("{itemId}")]
        public async Task<ActionResult> DeleteItem([FromRoute] int itemId)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                await _itemsService.DeleteItem(itemId, user);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error deleting item");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error deleting item");
                return BadRequest();
            }
        }
    }
}
