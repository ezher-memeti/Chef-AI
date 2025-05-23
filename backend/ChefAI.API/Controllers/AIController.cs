using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ChefAI.API.Models;
using ChefAI.API.Services.Interfaces;

namespace ChefAI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AIController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public AIController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateRecipes([FromBody] RecipeRequestDto request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request body.");
            }

            var recipes = await _recipeService.SearchRecipesAsync(
                request.Ingredients,
                request.Cuisine,
                request.Allergies,
                request.DietaryPreferences
            );

            if (recipes == null || recipes.Count == 0)
            {
                return NotFound("No recipes generated.");
            }

            return Ok(recipes);
        }
    }
}
