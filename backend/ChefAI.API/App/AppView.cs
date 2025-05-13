using ChefAI.API.Models;

namespace ChefAI.API.App
{
    public class AppView
    {
        public object ViewData { get; private set; }

        public void ShowLoginScreen()
        {
            // Implementation
        }

        public void ShowCreateAccountScreen()
        {
            // Implementation
        }

        public void ShowRecipeResults(List<Recipe> recipes)
        {
            // Implementation
        }

        public void ShowRecipeDetails(Recipe recipe)
        {
            // Implementation
        }

        public void ShowErrorMessage(string errorMessage)
        {
            // Implementation
        }

        public void ShowForgotPasswordScreen(string securityQuestion)
        {
            // Implementation
        }

        public void ShowPasswordUpdateScreen()
        {
            // Implementation
        }

        public void ShowSuccessMessage(string message)
        {
            // Implementation
        }
    }
}
