using System.Text;


namespace ChefAI.API.Models
{
    public class RecipeSearch
    {
        public List<string> UserIngredients { get; set; }
        public string UserCuisine { get; set; }
        public List<string> UserAllergies { get; set; }
        public List<string> UserDietaryPreferences { get; set; } = new();

        public string GeneratePrompt()
        {
          var prompt = new StringBuilder("Return a JSON array of 3 recipes. Each recipe should have the following fields:\n")
            .AppendLine("- RecipeName (string)")
            .AppendLine("- Ingredients (array of strings)")
            .AppendLine("- Instructions (string)")
            .AppendLine("- DietaryRestrictions (array of strings)")
            .AppendLine("- CuisineType (string)")
            .AppendLine("- PrepTime (int, in minutes)")
            .AppendLine("- CookTime (int, in minutes)")
            .AppendLine("- Calories (int)")
            .AppendLine("\nUser Preferences:");

           if (UserIngredients?.Any() == true)
              prompt.AppendLine($"Ingredients to include: {string.Join(", ", UserIngredients)}");

          if (!string.IsNullOrWhiteSpace(UserCuisine))
              prompt.AppendLine($"Cuisine: {UserCuisine}");

           if (UserAllergies?.Any() == true)
              prompt.AppendLine($"Exclude: {string.Join(", ", UserAllergies)}");

          
           if (UserDietaryPreferences?.Any() == true)
              prompt.AppendLine($"Dietary preferences: {string.Join(", ", UserDietaryPreferences)}");

          prompt.AppendLine("\nRespond ONLY in JSON. No explanation or extra text.");
          return prompt.ToString();
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
            if (UserAllergies == null || UserAllergies.Count == 0)
                return recipes;

            var cleanedAllergies = UserAllergies
                .Where(a => !string.IsNullOrWhiteSpace(a))
                .ToList();

            if (cleanedAllergies.Count == 0)
                return recipes;

            return recipes.Where(recipe =>
                !recipe.Ingredients.Any(ingredient =>
                    cleanedAllergies.Any(allergy =>
                        ingredient.Contains(allergy, StringComparison.OrdinalIgnoreCase)
                    )
                )
            ).ToList();
        }


        public List<Recipe> FilterRecipesByDietaryPreference(List<Recipe> recipes)
        {
            if (UserDietaryPreferences == null || UserDietaryPreferences.Count == 0)
                return recipes;

            var cleanedPrefs = UserDietaryPreferences
                .Where(pref => !string.IsNullOrWhiteSpace(pref))
                .ToList();

            if (cleanedPrefs.Count == 0)
                return recipes;

            return recipes
                .Where(recipe => cleanedPrefs.Any(pref => recipe.MatchDietaryPreferences(pref)))
                .ToList();
        }
    }
}
