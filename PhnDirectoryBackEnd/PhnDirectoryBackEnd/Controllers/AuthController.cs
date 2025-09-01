using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhnDirectoryBackEnd.Models.AuthModel.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PhnDirectoryBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<IdentityUser> userManager,
                              RoleManager<IdentityRole> roleManager,
                              IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        // ✅ POST: api/Auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return BadRequest("User already exists!");

            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Assign "User" role by default
            if (!await _roleManager.RoleExistsAsync("User"))
            {
                await _roleManager.CreateAsync(new IdentityRole("User"));
            }
            await _userManager.AddToRoleAsync(user, "User");
            var userRole = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, userRole);

            return Ok(new
            {
                token,
                expiration = DateTime.UtcNow.AddHours(1),
                userRole
            });

            //return Ok("User created successfully!");
        }
        // ✅ POST: api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Invalid credentials!");

            var userRole = await _userManager.GetRolesAsync(user);

            // Generate token
            var token = GenerateJwtToken(user, userRole);

            return Ok(new
            {
                token,
                expiration = DateTime.UtcNow.AddHours(1),
                userRole
            });
        }

        // ✅ POST: api/Auth/role-assign?userEmail=abc@test.com&role=Admin
        [Authorize(Roles = "Admin")]
        [HttpPost("roleassign")]
        public async Task<IActionResult> AssignRole([FromBody] RoleManager model)
        {
            var user = await _userManager.FindByEmailAsync(model.email);
            if (user == null)
                return NotFound("User not found");

            // Remove existing roles (if any)
            var existingRoles = await _userManager.GetRolesAsync(user);
            if (existingRoles.Any())
            {
                var removeResult = await _userManager.RemoveFromRolesAsync(user, existingRoles);
                if (!removeResult.Succeeded)
                    return BadRequest(removeResult.Errors);
            }

            // Ensure role exists
            if (!await _roleManager.RoleExistsAsync(model.userRole))
                return BadRequest("Role does not exist");

            // Assign the new role
            var addResult = await _userManager.AddToRoleAsync(user, model.userRole);
            if (!addResult.Succeeded)
                return BadRequest(addResult.Errors);

            //it return text format
            //return Ok($"Role '{model.userRole}' assigned successfully to {model.email}");

            //it return json format
            return Ok(new
            {
                message = $"Role '{model.userRole}' assigned successfully to {model.email}"
            });
}

       

        // 🔹 Token Generator
        private string GenerateJwtToken(IdentityUser user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(ClaimTypes.Name, user.Email ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Add roles
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
