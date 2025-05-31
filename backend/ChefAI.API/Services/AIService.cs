using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json; // ✅ keep this for parsing OpenAI's response
using Newtonsoft.Json;  // ✅ use this for serialization and deserialization
using ChefAI.API.Models;
using ChefAI.API.Services.Interfaces;

namespace ChefAI.API.Services
{
    public class AIService : IAIService
    {
        private readonly string _apiKey;
        private readonly string _apiEndpoint;
        private readonly HttpClient _httpClient;

        public AIService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _apiKey = configuration["ApiSettings:OpenAIApiKey"];
            _apiEndpoint = "https://api.openai.com/v1/chat/completions";
            _httpClient = httpClientFactory.CreateClient();
        }

        public async Task<string> SendRequestAsync(string prompt)
        {
            var requestBody = new
            {
                model = "gpt-4",
                messages = new[]
                {
                    new { role = "system", content = "You are a helpful chef assistant that outputs recipe data in JSON format." },
                    new { role = "user", content = prompt }
                },
                temperature = 0.7
            };

            // ✅ Use Newtonsoft for serialization
            var json = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            var response = await _httpClient.PostAsync(_apiEndpoint, content);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            return responseString;
        }

        public List<Recipe> ParseResponse(string json)
        {
            try
            {
                using var doc = JsonDocument.Parse(json);
                var content = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                Console.WriteLine("🔍 Raw content from OpenAI:");
                Console.WriteLine(content);

                content = content.Trim();
                if (content.StartsWith("```json"))
                    content = content.Replace("```json", "").Replace("```", "").Trim();

                Console.WriteLine("🧪 Cleaned JSON:");
                Console.WriteLine(content);

                // ✅ Deserialize with Newtonsoft
                var recipes = JsonConvert.DeserializeObject<List<Recipe>>(content);

                if (recipes != null)
                {
                    foreach (var recipe in recipes)
                    {
                        Console.WriteLine($"✅ Recipe Parsed: {recipe.RecipeName}, {recipe.CuisineType}, {recipe.Calories} cal");
                    }
                }

                if (recipes == null || recipes.Count == 0)
                {
                    Console.WriteLine("⚠️ Still got 0 recipes — investigate content shape.");
                    return new List<Recipe>();
                }

                return recipes;

            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ Newtonsoft failed to parse:");
                Console.WriteLine(ex.Message);
                return new List<Recipe>();
            }
        }

        public bool CheckAPIStatus()
        {
            return true;
        }
    }
}
