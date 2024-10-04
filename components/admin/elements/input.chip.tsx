import { montserrat } from "@/lib/fonts";
import React from "react";

interface InputChipProps {
  label: string;
  id?: string; // Optional id prop for the input
  name?: string; // Optional id prop for the input
  placeholder?: string;
  chips: string[]; // Current chip values
  onChange: (newChips: string[]) => void; // Function to update chips
  error?: string;
  inputSize?: "small" | "medium" | "large";
}

const InputChip: React.FC<InputChipProps> = ({
  label,
  id,
  placeholder,
  chips,
  name,
  onChange,
  error,
  inputSize,
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleAddChip = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newChips: string[] = [...chips, inputValue.trim()]; // Ensure newChips is of type string[]
      setInputValue("");
      onChange(newChips); // This should work now
      e.preventDefault();
    }
  };

  const handleDeleteChip = (index: number) => {
    const updatedChips: string[] = chips.filter((_, i) => i !== index); // Ensure updatedChips is of type string[]
    onChange(updatedChips);
  };

  const paddingStyles = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "p-1";
      case "medium":
        return "p-2";
      case "large":
        return "p-[14px]";
    }
  };

  return (
    <div className={`${montserrat.className} text-sm`}>
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`flex flex-wrap items-center border rounded-lg gap-2 ${paddingStyles(
          inputSize ?? "large"
        )}`}
      >
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-start bg-gray-200 rounded px-2"
          >
            <span>{chip}</span>
            <button
              type="button"
              className="ml-3 text-sm text-gray-600 hover:text-gray-800"
              onClick={() => handleDeleteChip(index)}
            >
              <span className="text-base"> &times;</span>
            </button>
          </div>
        ))}
        <input
          type="text"
          id={id}
          name={name}
          className="flex-grow border-none outline-none"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddChip}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputChip;