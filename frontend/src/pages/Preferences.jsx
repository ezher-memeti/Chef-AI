import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropdownSelect from '../components/dropdownSelect'; // Adjust the path if needed
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-free", "High-Protein", "Low-Carb", "Diabetic-Friendly", "Lactose-Free"];
const predefinedAllergens = ["Dairy", "Nuts&Seeds", "Grains & Gluten", "Seafood & Shellfish", "Eggs", "Legumes & Pulses", "Additives & Preservatives"];
const Preferences = ({ userId }) => {
    const [preferences, setPreferences] = useState({
        allergens: [],
        dietary: [],
    });

    const navigate = useNavigate();

    const [customAllergen, setCustomAllergen] = useState("");
    const [allergenOptions, setAllergenOptions] = useState(predefinedAllergens);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const res = await axios.get(`/api/users/${userId}/preferences`);
                setPreferences({
                    allergens: res.data.allergens || [],
                    dietary: res.data.dietary || [],
                });
            } catch (err) {
                console.error('Failed to fetch preferences:', err);
            }
        };
        fetchPreferences();
    }, [userId]);

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
            await axios.post(`/api/users/${userId}/preferences`, preferences);
            alert('Preferences saved!');
        } catch (err) {
            console.error('Failed to save preferences:', err);
            alert('Error saving preferences.');
        }
    };
    const handleReturn = () => {
        navigate(-1); // Go back to home/search page
    };

    return (
        <div className="flex-col w-full max-w-xl mt-4 justify-center align-center ">
            <div className="flex justify-between py-4" >
                <h1 className="text-2xl font-bold bg-my-text-gradient bg-clip-text text-transparent leading-tight">

                </h1>
                <button onClick={handleReturn} className="flex items-center text-white px-4 py-2">
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
                            className="w-full mt-4 bg-my-button-color hover:bg-my-button-color/90 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
