// Result.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SelectedSearchInfo from "../components/SelectedSearchInfo";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { ShareIcon } from "@heroicons/react/20/solid";
import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import RecipeViewer from "../components/RecipeView";



const Result = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const location = useLocation();
    const selectedSearchInfo = location.state?.requestData;

    const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);



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
            <div className="flex justify-between py-4" >
                <h1 className="text-2xl font-bold bg-my-text-gradient bg-clip-text text-transparent leading-tight">
                    Bookmarks
                </h1>
                <button onClick={handleReturn} className="flex items-center text-white px-4 py-2">
                    <ChevronLeftIcon className="w-5 h-5 ml-2" />
                    Return
                </button>
            </div>

            <RecipeViewer
                recipes={recipes}
                selectedSearchInfo={selectedSearchInfo}
                bookmarkedRecipes={bookmarkedRecipes}
            />
        </div>
    );
};

export default Result;
