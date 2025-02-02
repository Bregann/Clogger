namespace Clogger.Domain.DTOs.Auth.Response
{
    public class LoginUserResponse
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
    }
}
