using ChefAI.API.Models;


namespace ChefAI.API.Services.Interfaces
{
    public interface IUserService
    {
        User CreateAccount(string username, string password, string firstName, string lastName, string question, string answer);
        bool Login(string username, string password);
        string GetSecurityQuestion(string username);
        bool ValidateSecurityAnswer(string username, string answer);
        void UpdatePassword(string username, string newPassword);
        User GetUser(string username); 
    }
}
