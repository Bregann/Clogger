using Clogger.Domain.Data.Database;
using Clogger.Domain.Data.Database.Models;
using Clogger.Domain.DTOs.Auth.Requests;
using Clogger.Domain.DTOs.Auth.Response;
using Clogger.Domain.Interfaces.Api;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Clogger.Domain.Data.Services
{
    public class AuthService(AppDbContext dbContext) : IAuthService
    {
        private readonly AppDbContext _context = dbContext;
        private readonly PasswordHasher<User> _passwordHasher = new();

        public async Task RegisterUser(RegisterUserRequest request)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (_context.Users.Any(x => x.Username == request.Username || x.Email == request.Email))
            {
                throw new DuplicateNameException("User already exists");
            }

            var newUser = new User
            {
                Username = request.Username.ToLower().Trim(),
                FirstName = request.FirstName.Trim(),
                PasswordHash = _passwordHasher.HashPassword(new User(), request.Password.Trim())
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        }

        public async Task<LoginUserResponse> LoginUser(LoginUserRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username.ToLower().Trim());

            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            if (_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                throw new UnauthorizedAccessException("Invalid password");
            }

            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            await SaveRefreshToken(refreshToken, user.Id);

            return new LoginUserResponse
            {
                AccessToken = token,
                RefreshToken = refreshToken
            };
        }

        public async Task<LoginUserResponse> RefreshToken(string userRefreshToken)
        {
            var refreshToken = await _context.UserRefreshTokens.FirstOrDefaultAsync(t => t.Token == userRefreshToken) ?? throw new KeyNotFoundException("Refresh token not found");

            if (refreshToken.ExpiresAt < DateTime.Now)
            {
                throw new UnauthorizedAccessException("Refresh token expired");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == refreshToken.UserId);

            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var token = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            await SaveRefreshToken(newRefreshToken, user.Id);

            refreshToken.IsRevoked = true;
            await _context.SaveChangesAsync();

            return new LoginUserResponse
            {
                AccessToken = token,
                RefreshToken = newRefreshToken
            };
        }

        private static string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JwtKey")!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("JwtValidIssuer"),
                audience: Environment.GetEnvironmentVariable("JwtValidAudience"),
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string GenerateRefreshToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(128));
        }

        private async Task SaveRefreshToken(string token, string userId)
        {
            var refreshToken = new UserRefreshToken
            {
                Token = token,
                UserId = userId,
                ExpiresAt = DateTime.Now.AddDays(7)
            };

            _context.UserRefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();
        }
    }
}
