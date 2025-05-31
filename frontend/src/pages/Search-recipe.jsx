import React, { useState } from "react";
import DropdownSelect from "../components/dropdownSelect";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const dietaryPreferences = ["Vegetarian", "Vegan", "Gluten-free", "High-Protein", "Low-Carb", "Diabetic-Friendly", "Lactose-Free"];
const AlergicIngredients = ["Dairy", "Nuts&Seeds", "Grains & Gluten", "Seafood & Shellfish", "Eggs", "Legumes & Pulses", "Additives & Preservatives"];
const Cuisines = ["Turkish", "Italian", "Mexican", "Indian", "French", "Middle-Eastern", "Japanese", "American"];
const FoodTypes = ["Starter", "Main Course", "Dessert"];

const SearchRecipePage = () => {
    const [selectedCuisine, setSelectedCuisine] = useState("");
    const [selectedFoodType, setSelectedFoodType] = useState("");
    const [selectedAlergicIngredients, setSelectedAlergicIngredients] = useState([]);
    const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // to control dropdown rendering after fetch
    const [ingredientsInput, setIngredientsInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorPlace, setErrorPlace] = useState("");

    const navigate = useNavigate();

    const username = localStorage.getItem('userName');

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const res = await fetch(`http://localhost:5004/api/User/${username}/preferences`);
                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();

                setSelectedAlergicIngredients(data.allergens || []);
                setSelectedDietaryPreferences(data.dietary || []);
                console.log(data);
            } catch (err) {
                console.error("Failed to fetch user preferences:", err);
                console.log(err);
            } finally {
                setIsLoaded(true); // enable dropdowns after load
            }
        };

        if (username) fetchPreferences();
    }, [username]);


    const findInvalidIngredient = (input) => {
        const words = input.split(",").map(word => word.trim());

        for (const word of words) {
            if (!/^[a-zA-Z\s]+$/.test(word) || word.length < 2 || word.length > 30) {
                return word; // return the invalid word
            }
        }

        return null; // no problems
    };

    const handleSubmit = async () => {

        const trimmedInput = ingredientsInput.trim();

        if (!trimmedInput) {
            setErrorMessage("Please enter some ingredients.");
            setErrorPlace("ingredients");
            return;
        }

        const invalidIngredient = findInvalidIngredient(trimmedInput);
        if (invalidIngredient) {
            setErrorMessage(`Invalid ingredient: "${invalidIngredient}". Only letters are allowed, 2-30 characters.`);
            setErrorPlace("ingredients");
            return;
        }

        if (!selectedCuisine) {
            setErrorMessage("Please select a cuisine");
            setErrorPlace("cuisine");
            return;
        }
        if (!selectedFoodType) {
            setErrorMessage("Please select a Food Type");
            setErrorPlace("foodType");
            return;
        }
        setErrorPlace("");
        setErrorMessage("");
        let ingredientsList = ingredientsInput.split(",").map(ingredientsList => ingredientsList.trim());
        const requestData = {
            cuisine: selectedCuisine,
            foodType: selectedFoodType,
            alergicIngredients: selectedAlergicIngredients,
            dietaryPreferences: selectedDietaryPreferences,
            ingredients: ingredientsList
        };

        console.log(requestData); // <- see what you will send

        try {
            const response = await fetch("http://localhost:5004/api/AI/generate", {
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

        navigate('/ResultPage', { state: { requestData } });
    };


    return (
        <div className="flex-col justify-around items-center">
            <h1 className="text-5xl text-center font-bold bg-my-text-gradient bg-clip-text text-transparent md:text-6xl mb-12 leading-tight">
                Flavor Meets<br />Intelligence
            </h1>
            <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-2xl w-full w-[100vw] max-w-4xl md:w-[900px] flex flex-col items-center gap-6">
                <p className="text-sm text-center text-gray-700 font-medium">
                    Got ingredients? Select your cuisine and let Chef AI cook up ideas!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                    <DropdownSelect label="Cuisine" options={Cuisines} selected={selectedCuisine} setSelected={setSelectedCuisine} errorPlace={errorPlace} />
                    <DropdownSelect label="Food type" options={FoodTypes} selected={selectedFoodType} setSelected={setSelectedFoodType} errorPlace={errorPlace} />
                    {isLoaded && (
                        <DropdownSelect
                            label="Alergic ingredients"
                            options={AlergicIngredients}
                            multiSelect={true}
                            selected={selectedAlergicIngredients}
                            setSelected={setSelectedAlergicIngredients}
                        />
                    )}

                    {isLoaded && (
                        <DropdownSelect
                            label="Dietary Preference"
                            options={dietaryPreferences}
                            multiSelect={true}
                            selected={selectedDietaryPreferences}
                            setSelected={setSelectedDietaryPreferences}
                        />
                    )}

                </div>

                <div className="flex flex-col w-full">
                    <label className="mb-2 text-white">INGREDIENTS</label>
                    <input
                        type="text"
                        value={ingredientsInput}
                        onChange={(e) => setIngredientsInput(e.target.value)}
                        placeholder="e.g. tomatoes, garlic, pasta"
                        className={`p-4 rounded-lg bg-my-button-color bg-opacity-20 placeholder-gray-500 text-gray-700 focus:outline-none ${(errorPlace === 'ingredients') ? "border border-red-500" : ""
                            }`}
                    />
                    {errorMessage && (
                        <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>

                <button
                    className="w-full p-4 mt-2 bg-my-button-gradient rounded-lg font-semibold hover:opacity-80 hover:text-white transition"
                    onClick={handleSubmit}
                >
                    Generate Recipe
                </button>
            </div>
        </div>
    );
}

export default SearchRecipePage;
