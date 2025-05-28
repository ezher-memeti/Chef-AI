using ChefAI.API.Services;
using ChefAI.API.Services.Interfaces;


var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});



builder.Services.AddHttpClient();
builder.Services.AddControllers();

builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddScoped<IRecipeService, RecipeService>();
builder.Services.AddScoped<IAIService, AIService>();


builder.Services.AddOpenApi();

var app = builder.Build();
app.UseCors("AllowFrontend");



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.MapControllers();

app.Run();


