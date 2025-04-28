// Result.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SelectedSearchInfo from "../components/SelectedSearchInfo";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const Result = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const selectedSearchInfo = location.state?.requestData;


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // Uncomment this when backend is ready
                /*
                const response = await fetch("/api/recipes/latest"); // adjust endpoint if needed
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data = await response.json();
                */

                // Temporary test data
                const data = [
                    {
                        title: "Spaghetti Bolognese",
                        ingredients: [
                            "200g spaghetti",
                            "100g minced beef",
                            "1 onion, chopped",
                            "2 cloves garlic, minced",
                            "400g canned tomatoes",
                            "Salt and pepper",
                            "Olive oil",
                        ],
                        instructions: [
                            "Cook spaghetti according to package instructions.",
                            "In a pan, heat olive oil and sauté onion and garlic until soft.",
                            "Add minced beef and cook until browned.",
                            "Add canned tomatoes, salt, and pepper. Simmer for 15 minutes.",
                            "Serve sauce over spaghetti."
                        ]
                    },
                    {
                        title: "Chicken Caesar Salad",
                        ingredients: [
                            "2 chicken breasts",
                            "1 romaine lettuce",
                            "50g parmesan cheese",
                            "Croutons",
                            "Caesar dressing",
                            "Salt and pepper",
                        ],
                        instructions: [
                            "Grill chicken breasts and slice them.",
                            "Wash and chop romaine lettuce.",
                            "Mix lettuce, croutons, sliced chicken, and parmesan.",
                            "Drizzle Caesar dressing over the salad and toss.",
                        ]
                    }
                ];

                if (Array.isArray(data) && data.length > 0) {
                    setRecipes(data);
                    setSelectedRecipe(data[0]); // Select the first recipe by default
                } else {
                    throw new Error("No recipes found");
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
                navigate("/"); // Redirect if something goes wrong
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [navigate]);

    const handleReturn = () => {
        navigate("/"); // Go back to home/search page
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white text-2xl">
                Loading recipes...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-white text-2xl">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="flex-col mt-4 justify-center align-center">

            {/* Return button */}
            <div className="flex justify-between py-4" >
                <h1 className="text-2xl text-left font-bold bg-my-text-gradient bg-clip-text text-transparent leading-tight">
                    Chef AI has prepared options,<br />your turn to choose.
                </h1>
                <button
                    onClick={handleReturn}
                    className="flex items-center justify-center text-white  px-4 py-2 transition"
                >
                    <ChevronLeftIcon className={`w-5 h-5 ml-2 transform `} />
                    Return
                </button>
            </div>
            <div className="relative flex gap-4 justify-around items-center w-full max-w-7xl md:w-[1100px] h-[70vh] overflow-hidden">

                {/* Left Side - Recipe List */}
                <div className="w-1/3 flex flex-col gap-4 p-6 bg-white/20 backdrop-blur-md rounded-xl border overflow-y-auto h-full">
                    {recipes.map((recipe, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedRecipe(recipe)}
                            className={`rounded-lg p-8 font-bold transition ${selectedRecipe === recipe
                                ? "z-10 bg-my-button-color text-white"
                                : "z-10 bg-my-button-color/30 text-black hover:bg-my-button-color/40 hover:text-white"
                                }`}
                        >
                            {recipe.title || `Food ${index + 1}`}
                        </button>
                    ))}
                </div>

                {/* Right Side - Instructions + User Selections */}
                <div className="flex flex-col justify-between w-2/3 backdrop-blur-md h-full gap-4">

                    {/* Instructions (top half) */}
                    <div className="flex-1 overflow-y-auto border items-center justify-center text-center bg-white/20 rounded-xl p-6">
                        {selectedRecipe ? (
                            <div className="space-y-6">
                                <h1 className="text-3xl font-bold text-center text-myTextPrimary">
                                    {selectedRecipe.title}
                                </h1>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-4 text-myTextPrimary">
                                        Ingredients
                                    </h2>
                                    <div className="grid grid-cols-2 gap-2 text-start">
                                        {selectedRecipe.ingredients.map((ingredient, idx) => (
                                            <div key={idx} className="text-myTextPrimary">
                                                • {ingredient}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-4 text-myTextPrimary">
                                        Instructions
                                    </h2>
                                    <ol className="list-decimal list-inside space-y-4 text-start text-myTextPrimary">
                                        {selectedRecipe.instructions.map((step, idx) => (
                                            <li key={idx}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-white">
                                Please select a recipe.
                            </div>
                        )}
                    </div>

                    {/* Search Info (bottom) */}
                    <div className="overflow-y-auto rounded-xl">
                        <div className="flex justify-around items-center text-center text-white p-4 gap-4">
                            <SelectedSearchInfo searchInfo={selectedSearchInfo.cuisine} />
                            <SelectedSearchInfo searchInfo={selectedSearchInfo.dietaryPreferences} />
                            <SelectedSearchInfo searchInfo={selectedSearchInfo.foodType} />
                            <SelectedSearchInfo searchInfo={selectedSearchInfo.ingredients} />
                            <SelectedSearchInfo searchInfo={selectedSearchInfo.alergicIngredients} />
                            {/* Add more info as needed */}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Result;
