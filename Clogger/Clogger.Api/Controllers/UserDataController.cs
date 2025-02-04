using Clogger.Domain.Interfaces.Api;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class UserDataController(IUserDataService userDataService, IUserContextHelper userContextHelper) : ControllerBase
    {
        private readonly IUserDataService _userDataService = userDataService;
        private readonly IUserContextHelper _userContextHelper = userContextHelper;

        // This is being used by registration due to not being able to scaffold the identity methods.
        // TODO: update and remove this when scaffolding is allowed
        [HttpPost("{name}")]
        public async Task<IActionResult> SetUsername([FromRoute] string name)
        {
            var user = _userContextHelper.GetUserId();

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _userDataService.SetUsername(name, user);

            if (result == false)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
