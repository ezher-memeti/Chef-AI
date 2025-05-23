using ChefAI.API.Models;
using ChefAI.API.Services.Interfaces;
using System.Collections.Concurrent;

namespace ChefAI.API.Services
{
    public class UserService : IUserService
    {
        private readonly ConcurrentDictionary<string, User> _users = new();

        public User CreateAccount(string username, string password, string firstName, string lastName, string question, string answer)
        {
            var user = User.CreateAccount(username, password, firstName, lastName, question, answer);
            _users[username] = user;
            return user;
        }

        public bool Login(string username, string password)
        {
            return _users.TryGetValue(username, out var user) && user.Login(password);
        }

        public string GetSecurityQuestion(string username)
        {
            return _users.TryGetValue(username, out var user) ? user.SecurityQuestion : null;
        }

        public bool ValidateSecurityAnswer(string username, string answer)
        {
            return _users.TryGetValue(username, out var user) && user.ValidateSecurityAnswer(answer);
        }

        public void UpdatePassword(string username, string newPassword)
        {
            if (_users.TryGetValue(username, out var user))
            {
                user.UpdatePassword(newPassword);
            }
        }

        public User GetUser(string username)
        {
            _users.TryGetValue(username, out var user);
            return user;
        }
    }
}