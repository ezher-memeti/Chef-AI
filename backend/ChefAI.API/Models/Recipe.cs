using Newtonsoft.Json;

namespace ChefAI.API.Models
{
    public class Recipe
    {
        [JsonProperty("RecipeName")]
        public string RecipeName { get; set; }

        [JsonProperty("Ingredients")]
        public List<string> Ingredients { get; set; }

        [JsonProperty("Instructions")]
        public string Instructions { get; set; }

        [JsonProperty("DietaryRestrictions")]
        public List<string> DietaryRestrictions { get; set; }

        [JsonProperty("CuisineType")]
        public string CuisineType { get; set; }

        [JsonProperty("PrepTime")]
        public int PrepTime { get; set; }

        [JsonProperty("CookTime")]
        public int CookTime { get; set; }

        [JsonProperty("Calories")]
        public int Calories { get; set; }

        public void DisplayRecipe()
        {
            // This would be connected to the View layer later
        }

        public List<string> GetRecipeIngredients() => Ingredients;
        public string GetRecipeInstructions() => Instructions;

        public bool MatchDietaryPreferences(string preference)
        {
            return DietaryRestrictions
                .Any(r => r.Contains(preference, StringComparison.OrdinalIgnoreCase));
        }

    }
}
