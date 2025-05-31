// Result.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import RecipeViewer from "../components/RecipeView";

const Result = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("userName");

    const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await fetch(`http://localhost:5004/api/bookmark/${username}`);
                if (!response.ok) throw new Error("Failed to load bookmarks");

                const data = await response.json();
                const cleaned = data.map(recipe => ({
                  ...recipe,
                  ingredients: typeof recipe.ingredients === "string"
                    ? recipe.ingredients.split("\n")
                    : recipe.ingredients,
                  instructions: typeof recipe.instructions === "string"
                    ? recipe.instructions.split("\n")
                    : recipe.instructions
                }));
                setBookmarkedRecipes(cleaned || []);
                setSelectedRecipe(cleaned?.[0] || null);
            } catch (err) {
                console.error("❌ Bookmark fetch error:", err);
                setError("Could not load bookmarks.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, [username]);

    const handleReturn = () => {
        navigate(-1); // Go back
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white text-2xl">
                Loading bookmarks...
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
            <div className="flex justify-between py-4">
                <h1 className="text-2xl font-bold bg-my-text-gradient bg-clip-text text-transparent leading-tight">
                    Your Bookmarked Recipes
                </h1>
                <button onClick={handleReturn} className="flex items-center text-white px-4 py-2">
                    <ChevronLeftIcon className="w-5 h-5 ml-2" />
                    Return
                </button>
            </div>

            <RecipeViewer
                recipes={bookmarkedRecipes}
                selectedRecipe={selectedRecipe}
                setSelectedRecipe={setSelectedRecipe}
                bookmarkedRecipes={bookmarkedRecipes}
            />
        </div>
    );
};

export default Result;
