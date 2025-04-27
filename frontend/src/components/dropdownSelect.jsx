import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DropdownSelect = ({ label, options = [], multiSelect = false, selected, setSelected, errorPlace = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        if (multiSelect) {
            if (selected.includes(option)) {
                setSelected(selected.filter((item) => item !== option));
            } else {
                setSelected([...selected, option]);
            }
        } else {
            setSelected(option);
            setIsOpen(false);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                className={`w-full flex justify-between items-center p-3 rounded-lg bg-my-button-color text-white font-medium focus:outline-none ${({ errorPlace } === 'foodType') ? " border border-red-500" : ""
                    }`}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">
                    {multiSelect
                        ? selected.length > 0
                            ? selected.join(", ")
                            : label
                        : selected || label}
                </span>
                <ChevronDownIcon className={`w-5 h-5 ml-2 transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {
                isOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`cursor-pointer px-4 py-2 hover:bg-my-button-color hover:text-white ${(multiSelect && selected.includes(option)) ||
                                    (!multiSelect && selected === option)
                                    ? "bg-my-button-color text-white"
                                    : ""
                                    }`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

export default DropdownSelect;
