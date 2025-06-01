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
    const location = useLocation();
    
    const selectedSearchInfo = location.state?.requestData;
    const aiResult = location.state?.result;  // AI'den gelen tarifler burada

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

    useEffect(() => {
    try {
        if (Array.isArray(aiResult) && aiResult.length > 0) {
            // Gelen tarifleri normalize et
            const cleaned = aiResult.map(recipe => ({
                ...recipe,
                ingredients: Array.isArray(recipe.ingredients)
                    ? recipe.ingredients
                    : recipe.ingredients?.split?.('\n') || [],
                instructions: Array.isArray(recipe.instructions)
                    ? recipe.instructions
                    : recipe.instructions?.split?.('\n') || []
            }));
            
            console.log("🔍 Raw aiResult:", aiResult);
            setRecipes(cleaned);
            console.log("🔍 Raw cleansed:", cleaned);
            setSelectedRecipe(cleaned[0]);
        } else {
            throw new Error("No recipes received.");
        }
    } catch (err) {
        console.error(err);
        setError(err.message);
        navigate("/SearchRecipePage");
    } finally {
        setLoading(false);
    }
}, [aiResult, navigate]);

    const handleReturn = () => {
        navigate("/SearchRecipePage");
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
                    Chef AI has prepared options,<br />your turn to choose.
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