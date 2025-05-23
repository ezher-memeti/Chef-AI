using ChefAI.API.Models;

namespace ChefAI.API.Services.Interfaces
{
    public interface IAIService
    {
        object SendRequest(string prompt);
        List<Recipe> ParseResponse(object response);
        bool CheckAPIStatus();
    }
}
