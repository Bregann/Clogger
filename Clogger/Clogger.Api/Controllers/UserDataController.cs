using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.Interfaces.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserDataController : ControllerBase
    {
        private readonly IUserDataService _userDataService;
        private readonly UserManager<AppUser> _userManager;

        public UserDataController(IUserDataService userDataService, UserManager<AppUser> userManager)
        {
            _userDataService = userDataService;
            _userManager = userManager;
        }

        // This is being used by registration due to not being able to scaffold the identity methods.
        // TODO: update and remove this when scaffolding is allowed
        [HttpPost("{name}")]
        public async Task<IActionResult> SetUsername([FromRoute] string name)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _userDataService.SetUsername(name, user.Id);

            if (result == false)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
