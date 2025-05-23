using ChefAI.API.Models;

namespace ChefAI.API.Services.Interfaces
{
    public interface IRecipeService
    {
        Task<List<Recipe>>SearchRecipesAsync(
            List<string> ingredients,
            string cuisine,
            List<string> allergies,
            List<string> dietaryPreferences
        );
    }
}