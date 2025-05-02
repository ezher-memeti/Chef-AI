import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SelectedSearchInfo from "../components/SelectedSearchInfo";
import { ChevronLeftIcon, ShareIcon } from "@heroicons/react/20/solid";
import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";

const RecipeViewer = ({ recipes, selectedSearchInfo, bookmarkedRecipes: initialBookmarks }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState(initialBookmarks || []);

    const isBookmarked = (recipe) => {
        return bookmarkedRecipes.some((r) => r.id === recipe.id);
    };

    const handleBookmark = async (recipe) => {
        const alreadyBookmarked = isBookmarked(recipe);

        if (alreadyBookmarked) {
            const confirmed = window.confirm("Are you sure you want to remove this bookmark?");
            if (!confirmed) return;

            // try {
            //     const response = await fetch(`/api/bookmarks/${recipe.id}`, {
            //         method: "DELETE",
            //     });

            // if (!response.ok) throw new Error("Failed to remove bookmark.");

            setBookmarkedRecipes((prev) =>
                prev.filter((r) => r.id !== recipe.id)
            );
            // } catch (error) {
            //     console.error("Unbookmark error:", error);
            //     alert("Could not remove bookmark.");
            // }
        } else {
            // try {
            //     const response = await fetch("/api/bookmarks", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(recipe),
            //     });

            //     if (!response.ok) throw new Error("Failed to add bookmark.");

            setBookmarkedRecipes((prev) => [...prev, recipe]);
            // } catch (error) {
            //     console.error("Bookmark error:", error);
            //     alert("Could not bookmark recipe.");
            // }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white text-2xl">Loading recipes...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-white text-2xl">Error: {error}</div>;
    }

    return (
        <div className="flex-col mt-4 justify-center align-center">
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

                    {/* Share and Bookmark Buttons */}
                    {selectedRecipe && (
                        <>
                            <button
                                onClick={() => {
                                    const message = encodeURIComponent(
                                        `Check out this recipe: 
${selectedRecipe.title} \n Ingredients: \n ${selectedRecipe.ingredients}
Instructions:
${selectedRecipe.instructions}`
                                    );
                                    const url = `https://wa.me/?text=${message}`;
                                    window.open(url, "_blank");
                                }}
                                className="absolute top-4 right-4 z-10 text-myTextPrimary px-4 py-2 rounded hover:text-black"
                            >
                                <ShareIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => handleBookmark(selectedRecipe)}
                                className="absolute top-4 right-16 z-10 text-myTextPrimary px-4 py-2 rounded hover:text-black"
                            >
                                {isBookmarked(selectedRecipe) ? (
                                    <SolidBookmarkIcon className="w-6 h-6" />
                                ) : (
                                    <OutlineBookmarkIcon className="w-6 h-6" />
                                )}
                            </button>
                        </>
                    )}

                    {/* Instructions */}
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
                                            <div key={idx} className="text-myTextPrimary">• {ingredient}</div>
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

                    {/* Search Info */}
                    <div className="overflow-y-auto rounded-xl">
                        <div className="flex justify-around items-center text-center text-white p-4 gap-4">
                            {selectedSearchInfo?.cuisine && <SelectedSearchInfo label="Cuisine" searchInfo={selectedSearchInfo.cuisine} />}
                            {selectedSearchInfo?.dietaryPreferences && <SelectedSearchInfo label="Dietary Preference" searchInfo={selectedSearchInfo.dietaryPreferences} />}
                            {selectedSearchInfo?.foodType && <SelectedSearchInfo label="Food Type" searchInfo={selectedSearchInfo.foodType} />}
                            {selectedSearchInfo?.ingredients && <SelectedSearchInfo label="Ingredients" searchInfo={selectedSearchInfo.ingredients} />}
                            {selectedSearchInfo?.alergicIngredients && <SelectedSearchInfo label="Allergic Ingredients" searchInfo={selectedSearchInfo.alergicIngredients} />}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RecipeViewer;
