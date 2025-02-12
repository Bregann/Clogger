using Clogger.Domain.DTOs.Collections.Requests;
using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Data;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class CollectionsController(ICollectionService collectionService, IUserContextHelper userContextHelper) : ControllerBase
    {
        private readonly ICollectionService _collectionService = collectionService;
        private readonly IUserContextHelper _userContextHelper = userContextHelper;

        [HttpGet]
        public async Task<ActionResult<GetCollectionsDto>> GetCollections()
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _collectionService.GetCollections(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Error attempting to get collections");
                return BadRequest();
            }
        }

        [HttpGet("{collectionId}")]
        public async Task<ActionResult<GetCollectionItemsDto>> GetCollectionItems([FromRoute] int collectionId)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _collectionService.GetCollectionItems(user, collectionId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error attempting to get collection items");
                return BadRequest();
            }
            catch(Exception ex)
            {
                Log.Warning(ex, "Unknown error attempting to get collection items");
                return BadRequest();
            }
        }

        [HttpGet("{collectionId}")]
        public async Task<ActionResult<GetEditCollectionDataDto>> GetEditCollectionData([FromRoute] int collectionId)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _collectionService.GetEditCollectionData(user, collectionId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error attempting to get edit collection data");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error attempting to get edit collection data");
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddNewCollection([FromBody] AddCollectionRequest dto)
        {
            var user = _userContextHelper.GetUser();

            try
            {
                var collectionId = await _collectionService.AddNewCollection(user, dto);
                return Ok(collectionId);
            }
            catch (DuplicateNameException ex)
            {
                Log.Warning(ex, "Error attempting to add new collection");
                return Conflict();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error attempting to add new collection");
                return BadRequest();
            }
        }

        [HttpPatch]
        public async Task<ActionResult> SaveCollectionChanges([FromBody] SaveCollectionChangesRequest dto)
        {
            var user = _userContextHelper.GetUser();

            try
            {
                await _collectionService.SaveCollectionChanges(user, dto);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error attempting to save collection changes");
                return NotFound();
            }
            catch (DuplicateNameException ex)
            {
                Log.Warning(ex, "Error attempting to save collection changes");
                return Conflict();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error attempting to save collection changes");
                return BadRequest();
            }
        }


        [HttpGet]
        public async Task<ActionResult<GetCollectionDropdownValuesDto>> GetCollectionDropdownValues()
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _collectionService.GetCollectionDropdownValues(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Error attempting to get collection dropdown values");
                return BadRequest();
            }
        }

        [HttpGet("{collectionId}")]
        public async Task<ActionResult<GetCustomCollectionFieldsDto>> GetCustomCollectionFields([FromRoute] int collectionId)
        {
            var user = _userContextHelper.GetUserId();

            try
            {
                var result = await _collectionService.GetCustomCollectionFields(user, collectionId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error attempting to get custom collection fields");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error attempting to get custom collection fields");
                return BadRequest();
            }
        }
    }
}
