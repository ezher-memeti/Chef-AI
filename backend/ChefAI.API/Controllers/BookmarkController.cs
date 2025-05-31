using Microsoft.AspNetCore.Mvc;
using ChefAI.API.Models;
using ChefAI.API.Services.Interfaces;

namespace ChefAI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookmarkController : ControllerBase
    {
        private readonly IUserService _userService;

        public BookmarkController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/bookmark/{username}
        [HttpGet("{username}")]
        public IActionResult GetBookmarks(string username)
        {
            var bookmarks = _userService.GetBookmarks(username);
            Console.WriteLine("Bookmark: " + bookmarks);
            return Ok(bookmarks);
        }

        // POST: api/bookmark/{username}
        [HttpPost("{username}")]
        public IActionResult AddBookmark(string username, [FromBody] Recipe recipe)
        {
            try
            {
                _userService.AddBookmark(username, recipe);
                return Ok(new { message = "Bookmark added." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // DELETE: api/bookmark/{username}/{recipeName}
        [HttpDelete("{username}/{recipeName}")]
        public IActionResult RemoveBookmark(string username, string recipeName)
        {
            try
            {
                _userService.RemoveBookmark(username, recipeName);
                return Ok(new { message = "Bookmark removed." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
