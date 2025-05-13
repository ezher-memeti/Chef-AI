using ChefAI.API.Models;

namespace ChefAI.API.App
{
    public class AppModel
    {
        public User User { get; private set; }
        public Recipe Recipe { get; private set; }
        public RecipeSearch RecipeSearch { get; private set; }

        public void SetUser(User user) => User = user;
        public User GetUser() => User;

        public void SetRecipe(Recipe recipe) => Recipe = recipe;
        public Recipe GetRecipe() => Recipe;

        public void SetRecipeSearch(RecipeSearch recipeSearch) => RecipeSearch = recipeSearch;
        public RecipeSearch GetRecipeSearch() => RecipeSearch;

        public string GetSecurityQuestion(string username) => User?.Username == username ? User.SecurityQuestion : null;

        public bool ValidateSecurityAnswer(string username, string answer)
        {
            return User?.Username == username && User.ValidateSecurityAnswer(answer);
        }

        public void UpdatePassword(string username, string newPassword)
        {
            if (User?.Username == username)
            {
                User.UpdatePassword(newPassword);
            }
        }
    }
}
