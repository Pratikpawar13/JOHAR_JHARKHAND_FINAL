import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import guidesData from "../data/guides.json";

export default function RegisteredTourGuides() {
  const [selectedCity, setSelectedCity] = useState("Sahibganj");
  const [guides, setGuides] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setGuides(guidesData);
  }, []);

  const cities = Object.keys(guides);

  // Filter guides based on search term
  const filteredGuides = guides[selectedCity]?.filter((guide) =>
    guide.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accessibility Links (Skip to Main Content, Screen Reader, Search) */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white text-sm">
        <a href="#main" className="hover:underline">Skip to Main Content</a>
        <div className="flex gap-4 items-center">
          <a href="#" className="hover:underline">Screen Reader</a>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 text-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setSearchTerm("")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Header with Background Image */}
      <header
        className="w-full h-96 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://cdn.create.vista.com/api/media/small/644881602/stock-photo-portrait-young-tour-guide-headset-sunglasses-blurred-interracial-tourists-andrews'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Registered Tour Guides</h1>
          <p className="text-lg">Certified Guides Across Jharkhand</p>
        </div>
      </header>

      {/* Main Content */}
      <main id="main" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold">Registered Tour Guides</h2>
        <p className="mt-2 text-gray-600 text-sm">
          Below is a list of certified tour guides registered with Jharkhand Tourism. These professionals are trained to provide expert guidance and enhance your travel experience. Contact them for personalized tours.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <h3 className="text-lg font-bold">{selectedCity}</h3>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredGuides.map((guide, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-4"
            >
              <h4 className="text-red-600 font-bold text-lg">{guide.name}</h4>
              <p className="text-sm mt-2 text-gray-700">City: {guide.city}</p>
              <p className="text-sm">Mobile: {guide.mobile}</p>
              <p className="text-sm">Email: {guide.email}</p>
              <p className="text-sm">Tourist Spot Covered: {guide.tourist_spot_covered}</p>
              <p className="text-sm">Language: {guide.language}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}