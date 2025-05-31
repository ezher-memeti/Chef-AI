using ChefAI.API.Models;

namespace ChefAI.API.Services.Interfaces
{
    public interface IAIService
    {
        Task<string> SendRequestAsync(string prompt);
        List<Recipe> ParseResponse(string response);
        bool CheckAPIStatus();
    }
}
