using Clogger.Domain.DTOs.Search.Responses;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SearchController(ISearchService searchService, IUserContextHelper userContextHelper) : ControllerBase
    {
        private readonly ISearchService _searchService = searchService;
        private readonly IUserContextHelper _userContextHelper = userContextHelper;

        [HttpGet("{searchTerm}")]
        public async Task<ActionResult<SearchResultsDto>> Search([FromRoute] string searchTerm)
        {
            var user = _userContextHelper.GetUserId();
            try
            {
                var result = await _searchService.Search(searchTerm.Trim().ToLower(), user);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                Log.Warning(ex, "Error searching");
                return BadRequest();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Unknown error searching");
                return BadRequest();
            }
        }
    }
}
