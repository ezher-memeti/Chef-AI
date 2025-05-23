namespace ChefAI.API.Models
{
    public class RecipeRequestDto
    {
        public List<string> Ingredients { get; set; } = new();
        public string Cuisine { get; set; } = string.Empty;
        public List<string> Allergies { get; set; } = new();
        public List<string> DietaryPreferences { get; set; } = new();
    }
}