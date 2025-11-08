using Api.Data;
using Api.DTOs;
using Api.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly IConfiguration _config;
        private readonly ApiContext _context;

        public AuthController(IConfiguration config, ApiContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> GenerateToken([FromBody] UserCredentialsDto creds)
        {

            var user = await ValidateUser(creds);

            if (user != null)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:ExpireMinutes"])),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

                var jwt = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new { token = jwt });
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            if (await _context.Users.AnyAsync(u => u.Username == req.Username))
                return BadRequest("Username already exists.");
            if (await _context.Users.AnyAsync(u => u.Email == req.Email))
                return BadRequest("Email already registered.");
            if (string.IsNullOrWhiteSpace(req.Password) || req.Password.Length < 6)
                return BadRequest("Password must be at least 6 characters.");
            if (req.Password != req.ConfirmPassword)
                return BadRequest("Passwords do not match.");


            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(req.Password);
            var newUser = new User
            {
                Username = req.Username,
                Email = req.Email,
                PasswordHash = hashedPassword,
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully.");
        }

        private async Task<User?> ValidateUser(UserCredentialsDto creds)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == creds.Username);
            if (user != null && BCrypt.Net.BCrypt.Verify(creds.Password, user.PasswordHash))
            {
                return user;
            }
            return null!;
        }
    }
}
