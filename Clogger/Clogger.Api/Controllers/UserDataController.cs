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

        [HttpPost("{name}")]
        public async Task<IActionResult> SetUsername([FromRoute] string name)
        {
            var user = _userContextHelper.GetUserId();

            var result = await _userDataService.SetUsername(name, user);

            if (result == false)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
