using Clogger.Domain.DTOs.Auth.Requests;
using Clogger.Domain.DTOs.Auth.Response;

namespace Clogger.Domain.Interfaces.Api
{
    public interface IAuthService
    {
        Task RegisterUser(RegisterUserRequest request);
        Task<LoginUserResponse> LoginUser(LoginUserRequest request);
        Task<LoginUserResponse> RefreshToken(string refreshToken);
    }
}
