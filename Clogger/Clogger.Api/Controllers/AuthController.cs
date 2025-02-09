using Clogger.Domain.DTOs.Auth.Requests;
using Clogger.Domain.DTOs.Auth.Response;
using Clogger.Domain.Interfaces.Api;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Clogger.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;

        [HttpPost]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterUserRequest request)
        {
            try
            {
                await _authService.RegisterUser(request);
            }
            catch (DuplicateNameException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<LoginUserResponse>> LoginUser([FromBody] LoginUserRequest request)
        {
            try
            {
                var response = await _authService.LoginUser(request);
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<LoginUserResponse>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                var response = await _authService.RefreshToken(request.RefreshToken);
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
