using Clogger.Domain.DTOs.Home.Responses;
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
    public class HomeController(IHomeService homeService, IUserContextHelper userContextHelper) : ControllerBase
    {
        private readonly IHomeService _homeService = homeService;
        private readonly IUserContextHelper _userContextHelper = userContextHelper;

        [HttpGet]
        public async Task<ActionResult<GetUserHeaderStatsDto>> GetUserHeaderStats()
        {
            var user = _userContextHelper.GetUser();

            try
            {
                var result = await _homeService.GetUserHeaderStats(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Error trying to get user header stats");
                return BadRequest();
            }
        }
    }
}
