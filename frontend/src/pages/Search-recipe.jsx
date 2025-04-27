import React, { useState } from "react";
import DropdownSelect from "../components/dropdownSelect";

const dietaryPreferences = ["Vegetarian", "Vegan", "Gluten-free", "High-Protein", "Low-Carb", "Diabetic-Friendly", "Lactose-Free"];
const AlergicIngredients = ["Dairy", "Nuts&Seeds", "Grains & Gluten", "Seafood & Shellfish", "Eggs", "Legumes & Pulses", "Additives & Preservatives"];
const Cuisines = ["Turkish", "Italian", "Mexican", "Indian", "French", "Middle-Eastern", "Japanese", "American"];
const FoodTypes = ["Starter", "Main Course", "Dessert"];

const SearchRecipePage = () => {
    const [selectedCuisine, setSelectedCuisine] = useState("");
    const [selectedFoodType, setSelectedFoodType] = useState("");
    const [selectedAlergicIngredients, setSelectedAlergicIngredients] = useState([]);
    const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState([]);
    const [ingredientsInput, setIngredientsInput] = useState("");

    const handleSubmit = async () => {
        const requestData = {
            cuisine: selectedCuisine,
            foodType: selectedFoodType,
            alergicIngredients: selectedAlergicIngredients,
            dietaryPreferences: selectedDietaryPreferences,
            ingredients: ingredientsInput
        };

        console.log(requestData); // <- see what you will send

        try {
            const response = await fetch("/api/your-backend-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();
            console.log(result);
            // You can handle success message, redirect, etc
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="flex-col justify-around items-center">
            <h1 className="text-5xl text-center font-bold bg-my-text-gradient bg-clip-text text-transparent md:text-6xl mb-12 leading-tight">
                Flavor Meets<br />Intelligence
            </h1>
            <div className="bg-white/30 backdrop-blur-md p-8 rounded-3xl w-full w-[100vw] max-w-4xl md:w-[900px] flex flex-col items-center gap-6">
                <p className="text-sm text-center text-gray-700 font-medium">
                    Got ingredients? Select your cuisine and let Chef AI cook up ideas!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                    <DropdownSelect label="Cuisine" options={Cuisines} selected={selectedCuisine} setSelected={setSelectedCuisine} />
                    <DropdownSelect label="Food type" options={FoodTypes} selected={selectedFoodType} setSelected={setSelectedFoodType} />
                    <DropdownSelect label="Alergic ingredients" options={AlergicIngredients} multiSelect={true} selected={selectedAlergicIngredients} setSelected={setSelectedAlergicIngredients} />
                    <DropdownSelect label="Dietary Preference" options={dietaryPreferences} multiSelect={true} selected={selectedDietaryPreferences} setSelected={setSelectedDietaryPreferences} />
                </div>

                <div className="flex flex-col w-full">
                    <label className="mb-2 text-white">INGREDIENTS</label>
                    <input
                        type="text"
                        value={ingredientsInput}
                        onChange={(e) => setIngredientsInput(e.target.value)}
                        placeholder="e.g. tomatoes, garlic, pasta"
                        className="p-4 rounded-lg bg-my-button-color bg-opacity-20 placeholder-gray-500 text-gray-700 focus:outline-none"
                    />
                </div>

                <button
                    className="w-full p-4 mt-4 bg-my-button-gradient rounded-lg font-semibold hover:opacity-80 hover:text-white transition"
                    onClick={handleSubmit}
                >
                    Generate Recipe
                </button>
            </div>
        </div>
    );
}

export default SearchRecipePage;
