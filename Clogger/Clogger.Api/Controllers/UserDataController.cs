using Clogger.Domain.Interfaces.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{

    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserDataController(IUserDataService userDataService, UserManager<IdentityUser> userManager) : ControllerBase
    {
        private readonly IUserDataService _userDataService = userDataService;
        private readonly UserManager<IdentityUser> _userManager = userManager;

        // this is being used by registration due to not being able to do scaffold the identity methods. Apparently it's coming in .NET 10
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
