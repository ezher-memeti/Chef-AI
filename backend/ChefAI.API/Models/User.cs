namespace ChefAI.API.Models
{
    public class User
    {
        public int Id { get; set; } // assigned during creation
        public string Username { get; set; }
        public string Password { get; set; }
        public string SecurityQuestion { get; set; }
        public string SecurityAnswer { get; set; }

        public string GetUsername() => Username;
        public string GetPassword() => Password;
        public string GetSecurityQuestion() => SecurityQuestion;
        public string GetSecurityAnswer() => SecurityAnswer;

        public static User CreateAccount(int id, string username, string password, string securityQuestion, string securityAnswer)
        {
            return new User
            {
                Id = id,
                Username = username,
                Password = password,
                SecurityQuestion = securityQuestion,
                SecurityAnswer = securityAnswer
            };
        }

        public bool Login(string password) => Password == password;

        public bool ValidateSecurityAnswer(string inputAnswer) =>
            SecurityAnswer.Equals(inputAnswer, StringComparison.OrdinalIgnoreCase);

        public void UpdatePassword(string newPassword) => Password = newPassword;
    }
}
