namespace ChefAI.API.Models
{
    public class UserDto
    {
        public int Id { get; set; } 
        
        public string Username { get; set; }

        public string Password { get; set; }

        public string SecurityQuestion { get; set; }

        public string SecurityAnswer { get; set; }

        public PreferencesDto Preferences { get; set; } = new PreferencesDto();

        public List<Recipe> Bookmarks { get; set; } = new();
    }
}
