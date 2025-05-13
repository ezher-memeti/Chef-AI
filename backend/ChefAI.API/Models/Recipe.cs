namespace ChefAI.API.Models
{
    public class Recipe
    {
        public string RecipeName { get; set; }
        public List<string> Ingredients { get; set; }
        public string Instructions { get; set; }
        public List<string> DietaryRestrictions { get; set; }
        public string CuisineType { get; set; }
        public int PrepTime { get; set; }
        public int CookTime { get; set; }
        public int Calories { get; set; }

        public void DisplayRecipe()
        {
            // This would be connected to the View layer later
        }

        public List<string> GetRecipeIngredients() => Ingredients;
        public string GetRecipeInstructions() => Instructions;

        public bool MatchDietaryPreferences(string userPreference)
        {
            return DietaryRestrictions.Contains(userPreference, StringComparer.OrdinalIgnoreCase);
        }
    }
}
