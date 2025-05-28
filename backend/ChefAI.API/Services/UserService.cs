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

    public User CreateAccount(string username, string password, string firstName, string lastName, string question, string answer)
    {
        var id = GetNextUserId();

        var user = User.CreateAccount(id, username, password, firstName, lastName, question, answer);

        var userDto = new UserDto
        {
            Id = id,
            Username = username,
            Password = password,
            FirstName = firstName,
            LastName = lastName,
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
        var user = GetUser(username);
        return user?.SecurityQuestion;
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
            userDto.FirstName,
            userDto.LastName,
            userDto.SecurityQuestion,
            userDto.SecurityAnswer
        );
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
}
