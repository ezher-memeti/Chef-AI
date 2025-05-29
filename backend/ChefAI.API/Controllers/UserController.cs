using Microsoft.AspNetCore.Mvc;
using ChefAI.API.Services.Interfaces;
using ChefAI.API.Models;

namespace ChefAI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            try
            {
                var user = _userService.CreateAccount(
                    userDto.Username,
                    userDto.Password,
                    userDto.SecurityQuestion,
                    userDto.SecurityAnswer
                );

                return Ok(user);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message); // "Username already exists."
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            bool success = _userService.Login(loginDto.Username, loginDto.Password);
            return success ? Ok("Login successful.") : Unauthorized("Login failed.");
        }

        [HttpGet("security-question")]
        public IActionResult GetSecurityQuestion([FromQuery] string username)
        {
            var question = _userService.GetSecurityQuestion(username);
            if (question == null)
                return NotFound("User not found.");

            return Ok(new { question });
        }


        [HttpPost("validate-answer")]
        public IActionResult ValidateSecurityAnswer([FromBody] SecurityAnswerDto dto)
        {
            bool isValid = _userService.ValidateSecurityAnswer(dto.Username, dto.Answer);
            return isValid ? Ok("Answer is correct.") : Unauthorized("Incorrect answer.");
        }

        [HttpPost("update-password")]
        public IActionResult UpdatePassword([FromBody] UpdatePasswordDto dto)
        {
            _userService.UpdatePassword(dto.Username, dto.NewPassword);
            return Ok("Password updated successfully.");
        }


        [HttpGet("{username}/preferences")]
        public IActionResult GetPreferences(string username)
        {
            var preferences = _userService.GetPreferences(username);
            return Ok(preferences);
        }

        [HttpPost("{username}/preferences")]
        public IActionResult UpdatePreferences(string username, [FromBody] PreferencesDto newPreferences)
        {
            try
            {
                _userService.UpdatePreferences(username, newPreferences);
                return Ok("Preferences updated successfully.");
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


    }
}