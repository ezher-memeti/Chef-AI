using System.Collections.Generic;
using System.Threading.Tasks;
using ChefAI.API.Models;
using ChefAI.API.Services.Interfaces;

namespace ChefAI.API.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IAIService _aiService;

        public RecipeService(IAIService aiService)
        {
            _aiService = aiService;
        }

        public async Task<List<Recipe>> SearchRecipesAsync(
            List<string> ingredients,
            string cuisine,
            List<string> allergies,
            List<string> dietaryPreferences)
        {
            var search = new RecipeSearch
            {
                UserIngredients = ingredients,
                UserCuisine = cuisine,
                UserAllergies = allergies,
                UserDietaryPreferences = dietaryPreferences
            };

        // Step 1: Generate AI prompt
        var prompt = search.GeneratePrompt();

        // Step 2: Call OpenAI (wrap sync method until AIService is async)
        var aiResponse = await Task.Run(() => _aiService.SendRequest(prompt));

        // Step 3: Parse AI response
        var recipes = _aiService.ParseResponse(aiResponse);

        // Debug log the raw recipe count before filtering
        Console.WriteLine($"🔍 Recipes returned before filtering: {recipes.Count}");

        // Step 4: Apply allergy and dietary filters
        recipes = search.FilterRecipesByAllergy(recipes);
        Console.WriteLine($"🧪 After allergy filter: {recipes.Count}");

        recipes = search.FilterRecipesByDietaryPreference(recipes);
        Console.WriteLine($"✅ After dietary filter: {recipes.Count}");

        // Optionally handle no results
        if (recipes.Count == 0)
        {
            Console.WriteLine("⚠️ No recipes left after filtering.");
            return new List<Recipe>(); // or return a meaningful error
        }

// Continue processing...
return recipes;


            return recipes;
        }
    }
}
