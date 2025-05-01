import React, { useEffect, useState } from 'react';

const Preferences = () => {
    const [preferences, setPreferences] = useState({
        allergens: '',
        dietary: '',
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('preferences'));
        if (saved) setPreferences(saved);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreferences(prev => ({ ...prev, [name]: value }));
    };

    const savePreferences = () => {
        localStorage.setItem('preferences', JSON.stringify(preferences));
        alert('Preferences saved!');
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Preferences</h2>

            <div className="space-y-4">
                <div>
                    <label>Allergic Ingredients</label>
                    <input name="allergens" value={preferences.allergens} onChange={handleChange} className="block w-full border p-2" />
                </div>

                <div>
                    <label>Dietary Preference</label>
                    <select name="dietary" value={preferences.dietary} onChange={handleChange} className="block w-full border p-2">
                        <option value="">None</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="gluten-free">Gluten-Free</option>
                    </select>
                </div>

                <div>
                    <label>Preparation Time (min)</label>
                    <input type="number" name="prepTime" value={preferences.prepTime} onChange={handleChange} className="block w-full border p-2" />
                </div>

                <button onClick={savePreferences} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default Preferences;
