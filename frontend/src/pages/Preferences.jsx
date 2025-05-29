import React, { useEffect, useState } from 'react';
import DropdownSelect from '../components/dropdownSelect';
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-free", "High-Protein", "Low-Carb", "Diabetic-Friendly", "Lactose-Free"];
const predefinedAllergens = ["Dairy", "Nuts&Seeds", "Grains & Gluten", "Seafood & Shellfish", "Eggs", "Legumes & Pulses", "Additives & Preservatives"];

const Preferences = () => {
    const username = localStorage.getItem('userName');
    const [preferences, setPreferences] = useState({ allergens: [], dietary: [] });
    const [initialPreferences, setInitialPreferences] = useState({ allergens: [], dietary: [] });
    const [customAllergen, setCustomAllergen] = useState("");
    const [allergenOptions, setAllergenOptions] = useState(predefinedAllergens);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPreferences = async () => {
            if (!username) return;
            try {
                const res = await fetch(`http://localhost:5004/api/User/${username}/preferences`);
                const data = await res.json();
                const userAllergens = data.allergens || [];
                const userDietary = data.dietary || [];

                // Detect and add custom allergens not in predefined list
                const customAllergensFromUser = userAllergens.filter(a => !predefinedAllergens.includes(a));
                setAllergenOptions(prev => [...new Set([...prev, ...customAllergensFromUser])]);

                setPreferences({
                    allergens: userAllergens,
                    dietary: userDietary,
                });

                setInitialPreferences({
                    allergens: userAllergens,
                    dietary: userDietary,
                });
            } catch (err) {
                console.error('Failed to fetch preferences:', err);
            }
        };
        fetchPreferences();
    }, [username]);


    const addCustomAllergen = () => {
        if (customAllergen && !allergenOptions.includes(customAllergen)) {
            setAllergenOptions([...allergenOptions, customAllergen]);
        }
        if (customAllergen && !preferences.allergens.includes(customAllergen)) {
            setPreferences(prev => ({
                ...prev,
                allergens: [...prev.allergens, customAllergen]
            }));
        }
        setCustomAllergen('');
    };

    const savePreferences = async () => {
        try {
            setIsSaving(true);
            const res = await fetch(`http://localhost:5004/api/User/${username}/preferences`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preferences)
            });

            if (!res.ok) throw new Error('Error saving preferences');
            setInitialPreferences(preferences);
            setSaveMessage('Preferences saved!');
        } catch (err) {
            console.error('Failed to save preferences:', err);
            setSaveMessage('Error saving preferences.');
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveMessage(''), 3000);
        }
    };

    const preferencesChanged = JSON.stringify(preferences) !== JSON.stringify(initialPreferences);

    return (
        <div className="flex-col w-full max-w-xl mt-4 justify-center align-center">
            <div className="flex justify-between py-4">
                <button onClick={() => navigate(-1)} className="flex items-center text-white px-4 py-2">
                    <ChevronLeftIcon className="w-5 h-5 ml-2" />
                    Return
                </button>
            </div>

            <div className="flex justify-center items-center w-full text-white">
                <div className="w-full max-w-xl p-8 bg-white/20 backdrop-blur-md rounded-xl shadow-lg space-y-6">
                    <h2 className="text-3xl font-bold text-center text-myTextPrimary">Your Preferences</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 text-myTextPrimary font-semibold">Allergic Ingredients</label>
                            <DropdownSelect
                                label="Select allergens"
                                options={allergenOptions}
                                multiSelect
                                selected={preferences.allergens}
                                setSelected={(val) => setPreferences(prev => ({ ...prev, allergens: val }))}
                            />
                            <div className="mt-2 flex gap-2">
                                <input
                                    type="text"
                                    value={customAllergen}
                                    onChange={(e) => setCustomAllergen(e.target.value)}
                                    className="flex-1 p-2 rounded bg-white text-black"
                                    placeholder="Add custom allergen"
                                />
                                <button
                                    onClick={addCustomAllergen}
                                    className="bg-my-button-color text-white px-4 py-2 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-myTextPrimary font-semibold">Dietary Preferences</label>
                            <DropdownSelect
                                label="Select dietary preferences"
                                options={dietaryOptions}
                                multiSelect
                                selected={preferences.dietary}
                                setSelected={(val) => setPreferences(prev => ({ ...prev, dietary: val }))}
                            />
                        </div>

                        <button
                            onClick={savePreferences}
                            disabled={!preferencesChanged || isSaving}
                            className={`w-full mt-4 font-semibold py-3 rounded-lg transition ${preferencesChanged && !isSaving
                                ? 'bg-my-button-color hover:bg-my-button-color/90 text-white'
                                : 'bg-gray-400 text-gray-100 cursor-not-allowed'
                                }`}
                        >
                            {isSaving ? 'Saving...' : 'Save Preferences'}
                        </button>

                        {saveMessage && (
                            <p className="text-center text-sm text-[red] mt-2">{saveMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
