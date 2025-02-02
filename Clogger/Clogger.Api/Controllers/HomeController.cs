using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Home.Responses;
using Clogger.Domain.Interfaces.Api;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHomeService _homeService;

        public HomeController(UserManager<ApplicationUser> userManager, IHomeService homeService)
        {
            _userManager = userManager;
            _homeService = homeService;
        }

        [HttpGet]
        public async Task<ActionResult<GetUserHeaderStatsDto>> GetUserHeaderStats()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized();
            }
            var result = await _homeService.GetUserHeaderStats(user);

            return Ok(result);
        }
    }
}
