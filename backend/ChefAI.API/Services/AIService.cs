using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
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
            _apiEndpoint = "https://api.openai.com/v1/chat/completions"; // You can make this configurable too
            _httpClient = httpClientFactory.CreateClient();
        }

        public object SendRequest(string prompt)
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

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            var response = _httpClient.PostAsync(_apiEndpoint, content).Result;
            response.EnsureSuccessStatusCode();

            var responseString = response.Content.ReadAsStringAsync().Result;
            return JsonDocument.Parse(responseString);
        }

        public List<Recipe> ParseResponse(object response)
        {
            var jsonDoc = response as JsonDocument;

            var content = jsonDoc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            Console.WriteLine("AI Raw Content:");
            Console.WriteLine(content);

            // Fix: remove extra characters if AI returns markdown
            content = content.Trim();
            if (content.StartsWith("```json"))
                content = content.Replace("```json", "").Replace("```", "").Trim();

            try
            {
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var recipes = JsonSerializer.Deserialize<List<Recipe>>(content, options);
                return recipes ?? new List<Recipe>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Parsing error: {ex.Message}");
                return new List<Recipe>();
            }
        }

        public bool CheckAPIStatus()
        {
            // Could ping a known endpoint or just return true for now
            return true;
        }
    }
}
