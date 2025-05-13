namespace ChefAI.API.Models
{
    public class RecipeSearch
    {
        public List<string> UserIngredients { get; set; }
        public string UserCuisine { get; set; }
        public List<string> UserAllergies { get; set; }
        public string UserDietaryPreferences { get; set; }

        public string GeneratePrompt()
        {
            return $"Find recipes with {string.Join(", ", UserIngredients)} cuisine: {UserCuisine}, dietary preferences: {UserDietaryPreferences}";
        }

        public List<Recipe> SendToAI()
        {
            // Placeholder for integration with AI Service
            return new List<Recipe>();
        }

        public void DisplayRecipes()
        {
            // Placeholder for View
        }

        public List<Recipe> FilterRecipesByAllergy(List<Recipe> recipes)
        {
            return recipes.Where(recipe => !recipe.Ingredients.Any(i => UserAllergies.Contains(i, StringComparer.OrdinalIgnoreCase))).ToList();
        }

        public List<Recipe> FilterRecipesByDietaryPreference(List<Recipe> recipes)
        {
            return recipes.Where(recipe => recipe.MatchDietaryPreferences(UserDietaryPreferences)).ToList();
        }
    }
}
