using ChefAI.API.Models;
using ChefAI.API.Services.Interfaces;
using System.Text.Json;


public class UserService : IUserService
{
    private readonly string _storagePath = Path.Combine("backend", "ChefAI.API", "JSONFiles");

    public UserService()
    {
        Directory.CreateDirectory(_storagePath);
    }

    private int GetNextUserId()
    {
        var files = Directory.GetFiles(_storagePath, "*.json");

        int maxId = 0;

        foreach (var file in files)
        {
            var json = File.ReadAllText(file);
            var userDto = JsonSerializer.Deserialize<UserDto>(json);

            if (userDto != null && userDto.Id > maxId)
            {
                maxId = userDto.Id;
            }
        }

        return maxId + 1;
    }

    public User CreateAccount(string username, string password, string question, string answer)
    {
    var existingUser = LoadUserDto(username);
    if (existingUser != null)
    {
        // Username already exists
        throw new InvalidOperationException("Username already exists.");
    }

    var id = GetNextUserId();

    var user = User.CreateAccount(id, username, password, question, answer);

    var userDto = new UserDto
    {
        Id = id,
        Username = username,
        Password = password,
        SecurityQuestion = question,
        SecurityAnswer = answer
    };

    SaveUserDto(userDto);
    return user;
    }


    public bool Login(string username, string password)
    {
        var user = GetUser(username);
        return user != null && user.Login(password);
    }

    public string GetSecurityQuestion(string username)
    {
        var userDto = LoadUserDto(username);
        return userDto?.SecurityQuestion;
    }

    public bool ValidateSecurityAnswer(string username, string answer)
    {
        var user = GetUser(username);
        return user?.ValidateSecurityAnswer(answer) == true;
    }

    public void UpdatePassword(string username, string newPassword)
    {
        var userDto = LoadUserDto(username);
        if (userDto != null)
        {
            userDto.Password = newPassword;
            SaveUserDto(userDto);
        }
    }

    public User GetUser(string username)
    {
        var userDto = LoadUserDto(username);
        if (userDto == null) return null;

        return User.CreateAccount(
            userDto.Id,
            userDto.Username,
            userDto.Password,
            userDto.SecurityQuestion,
            userDto.SecurityAnswer
        );
    }

    public PreferencesDto GetPreferences(string username)
    {
        var userDto = LoadUserDto(username);
        return userDto?.Preferences ?? new PreferencesDto();
    }

    public void UpdatePreferences(string username, PreferencesDto newPreferences)
    {
        var userDto = LoadUserDto(username);
        if (userDto == null)
            throw new InvalidOperationException("User not found.");

        userDto.Preferences = newPreferences;
        SaveUserDto(userDto);
    }



    private void SaveUserDto(UserDto userDto)
    {
        var path = GetUserFilePath(userDto.Username);
        var json = JsonSerializer.Serialize(userDto, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(path, json);
    }

    private UserDto LoadUserDto(string username)
    {
        var path = GetUserFilePath(username);
        if (!File.Exists(path)) return null;

        var json = File.ReadAllText(path);
        return JsonSerializer.Deserialize<UserDto>(json);
    }

    private string GetUserFilePath(string username)
    {
        return Path.Combine(_storagePath, $"{username}.json");
    }

    public List<Recipe> GetBookmarks(string username)
    {
        var userDto = LoadUserDto(username);
        return userDto?.Bookmarks ?? new List<Recipe>();
    }

    public void AddBookmark(string username, Recipe recipe)
    {
        var userDto = LoadUserDto(username);
        if (userDto == null) throw new InvalidOperationException("User not found.");

        userDto.Bookmarks ??= new List<Recipe>();

        if (!userDto.Bookmarks.Any(r => r.RecipeName == recipe.RecipeName))
        {
            userDto.Bookmarks.Add(recipe);
            SaveUserDto(userDto);
        }
    }

    public bool RemoveBookmark(string username, string recipeName)
    {
        var userDto = LoadUserDto(username);
        if (userDto == null || userDto.Bookmarks == null) return false;

        var removed = userDto.Bookmarks.RemoveAll(r => r.RecipeName == recipeName) > 0;

        if (removed)
            SaveUserDto(userDto);

        return removed;
    }


}
