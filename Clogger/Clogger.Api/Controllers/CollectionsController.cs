using Clogger.Domain.DTOs.Collections.Requests;
using Clogger.Domain.DTOs.Collections.Responses;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{collectionId}")]
        public async Task<ActionResult<GetEditCollectionDataDto>> GetEditCollectionData([FromRoute] int collectionId)
        {
            var user = _userContextHelper.GetUserId();

            if (user == null)
            {
                return Unauthorized();
            }

            try
            {
                var result = await _collectionService.GetEditCollectionData(user, collectionId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddNewCollection([FromBody] AddCollectionRequest dto)
        {
            var user = _userContextHelper.GetUser();

            if (user == null)
            {
                return Unauthorized();
            }

            try
            {
               var collectionId = await _collectionService.AddNewCollection(user, dto);
                return Ok(collectionId);
            }
            catch (DuplicateNameException)
            {
                return Conflict("Collection name already exists");
            }
        }
    }
}
