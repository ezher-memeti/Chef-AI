import React, { useState } from 'react';

const ShareRecipeButton = ({ recipe }) => {
    const [email, setEmail] = useState(userEmail || "");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleShare = async () => {
        // if (!email) {
        //     setStatus("Please enter an email.");
        //     return;
        // }

        // try {


        // } catch (err) {
        //     setStatus("Failed to send email.");
        // }
    };

    return (
        <div className="bg-white/10 rounded-lg p-4 mt-6 text-white shadow-lg space-y-3">
            <h3 className="text-xl font-semibold">Share this recipe</h3>

            {!userEmail && (
                <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full p-2 rounded bg-white/20 text-white placeholder-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            )}

            <button
                onClick={() => {
                    const message = encodeURIComponent(`Check out this recipe: ${selectedRecipe?.title}`);
                    const url = `https://wa.me/?text=${message}`;
                    window.open(url, "_blank");
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Share on WhatsApp
            </button>

            {message && (
                <p className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default ShareRecipeButton;
