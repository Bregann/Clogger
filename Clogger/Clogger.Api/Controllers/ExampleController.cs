using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExampleController : ControllerBase
    {

        [HttpGet("UserDetails")]
        public async Task<IActionResult> UserDetails()
        {
            var user = User;
            return Ok(user.Identity.Name);
        }
    }
}
