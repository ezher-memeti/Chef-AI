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
            var aiResponse = await _aiService.SendRequestAsync(prompt);

            // Step 3: Parse AI response
            var recipes = _aiService.ParseResponse(aiResponse);
            Console.WriteLine($"🧪 Before filtering: {recipes.Count} recipes");

            // Step 4: Apply filters
            recipes = search.FilterRecipesByAllergy(recipes);
            recipes = search.FilterRecipesByDietaryPreference(recipes);
            Console.WriteLine($"🎯 After filtering: {recipes.Count} recipes");

            if (recipes == null)
            {
                Console.WriteLine("❌ ParseResponse returned null");
            }
            else
            {
                Console.WriteLine($"✅ ParseResponse returned {recipes.Count} recipes");
                foreach (var r in recipes)
                {
                    Console.WriteLine($" - {r.RecipeName}");
                }
            }

            return recipes;
        }
    }
}
