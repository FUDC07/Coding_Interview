// src/components/VariantSelector.tsx
import React from 'react';
interface VariantSelectorProps {
    label: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
}
const VariantSelector: React.FC<VariantSelectorProps> = ({ label, options, selectedValue, onSelect }) => {
    return (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}:</label>
        <div className="flex flex-wrap gap-2">
        {options.map((option) => (
            <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                ${selectedValue === option 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
            >
            {option}
            </button>
        ))}
        </div>
    </div>
    );
};
export default VariantSelector;