using Clogger.Domain.DTOs.Home.Responses;
using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class HomeController : ControllerBase
    {
        private readonly IHomeService _homeService;
        private readonly IUserContextHelper _userContextHelper;

        public HomeController(IHomeService homeService, IUserContextHelper userContextHelper)
        {
            _homeService = homeService;
            _userContextHelper = userContextHelper;
        }

        [HttpGet]
        public async Task<ActionResult<GetUserHeaderStatsDto>> GetUserHeaderStats()
        {
            var user = _userContextHelper.GetUser();

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _homeService.GetUserHeaderStats(user);

            return Ok(result);
        }
    }
}
