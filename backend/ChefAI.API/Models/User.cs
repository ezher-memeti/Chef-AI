namespace ChefAI.API.Models
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SecurityQuestion { get; set; }
        public string SecurityAnswer { get; set; }

        public string GetUsername() => Username;
        public string GetPassword() => Password;
        public string GetSecurityQuestion() => SecurityQuestion;
        public string GetSecurityAnswer() => SecurityAnswer;

        public static User CreateAccount(string username, string password, string firstName, string lastName, string securityQuestion, string securityAnswer)
        {
            return new User
            {
                Username = username,
                Password = password,
                FirstName = firstName,
                LastName = lastName,
                SecurityQuestion = securityQuestion,
                SecurityAnswer = securityAnswer
            };
        }

        public bool Login(string password)
        {
            return Password == password;
        }

        public bool ValidateSecurityAnswer(string inputAnswer)
        {
            return SecurityAnswer.Equals(inputAnswer, StringComparison.OrdinalIgnoreCase);
        }

        public void UpdatePassword(string newPassword)
        {
            Password = newPassword;
        }
    }
}
