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

    }
}