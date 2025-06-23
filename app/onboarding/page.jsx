"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header.jsx";

const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const languages = [
  "Hindi",
  "English",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Urdu",
  "Kannada",
  "Malayalam",
];

export default function ArtistOnboarding() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      languages: selectedLanguages,
      id: Date.now(), // Add a unique ID for each artist
    };

    // Get existing data from localStorage
    const existingData = localStorage.getItem("artistFormData");
    let artistsArray = [];

    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        artistsArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) {
        console.error("Error parsing existing data:", error);
        artistsArray = [];
      }
    }

    // Append new artist data
    artistsArray.push(formData);
    localStorage.setItem("artistFormData", JSON.stringify(artistsArray));

    alert("Form submitted and saved to local storage!");
    // Clear the form completely
    reset({
      name: "",
      bio: "",
      category: "",
      location: "",
      fee: 1000,
    });
    setSelectedLanguages([]);
    setIsLanguageDropdownOpen(false);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((lang) => lang !== language);
      } else {
        return [...prev, language];
      }
    });
  };


  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Artist Onboarding Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              {...register("bio", { required: "Bio is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register("category", { required: "Select a category" })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Singer">Singer</option>
              <option value="Musician">Musician</option>
              <option value="Dancer">Dancer</option>
              <option value="Speaker">Speaker</option>
              <option value="Actor">Actor</option>
              <option value="DJ">DJ</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <select
              {...register("location", { required: "Select a location" })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              {statesOfIndia.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Languages Spoken</label>
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="w-full border p-2 rounded text-left bg-white flex justify-between items-center"
              >
                <span>
                  {selectedLanguages.length > 0
                    ? `${selectedLanguages.length} language(s) selected`
                    : "Select languages"}
                </span>
                <span
                  className={`transform transition-transform ${
                    isLanguageDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
                  {languages.map((language) => (
                    <label
                      key={language}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                        className="mr-2"
                      />
                      <span>{language}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {selectedLanguages.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected languages:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedLanguages.map((language) => (
                    <span
                      key={language}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center"
                    >
                      {language}
                      <button
                        type="button"
                        onClick={() => handleLanguageChange(language)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedLanguages.length === 0 && (
              <p className="text-red-500 text-sm">
                Please select at least one language
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Fee: ₹{watch("fee") || 1000}
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              {...register("fee", { required: "Fee is required" })}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            disabled={selectedLanguages.length === 0}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
