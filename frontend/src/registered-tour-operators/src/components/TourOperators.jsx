import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import operatorsData from "../data/operators.json"; // Adjust path as needed
import Footer from "../../../components/Footer";

export default function TourOperators() {
  const [selectedState, setSelectedState] = useState("Jharkhand");
  const [operators, setOperators] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Transform the data to handle the unusual key structure
    const transformedData = {};
    try {
      for (const key in operatorsData) {
        const stateMatch = key.match(/^([^\n]+)/); // Extract state name
        if (stateMatch) {
          const state = stateMatch[0];
          transformedData[state] = transformedData[state] || [];
          transformedData[state].push({
            name: key.split("\nAgency Name: ")[1].split("\n")[0],
            contact: key.split("\nContact Person: ")[1].split("\n")[0],
            address: key.split("\nAddress: ")[1].split("\n")[0],
            city: key.split("\nCity: ")[1].split("\n")[0],
            pincode: key.split("\nPincode: ")[1].split("\n")[0],
            phone: key.split("\nPhone: ")[1].split("\n")[0],
            mobile: key.split("\nMobile: ")[1].split("\n")[0],
            email: key.split("\nEmail: ")[1].split("\n")[0],
            website: key.split("\nWebsite: ")[1].split("\n")[0],
          });
        }
      }
      setOperators(transformedData);
    } catch (error) {
      console.error("Error loading operators data:", error);
      // Fallback to default data if JSON fails
      setOperators({ Jharkhand: [] });
    }
  }, []);

  const states = Object.keys(operators);

  // Filter operators based on search term
  const filteredOperators = operators[selectedState]?.filter((op) =>
    op.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          backgroundImage: "url('https://rustik-images.s3.us-west-2.amazonaws.com/wp-content/uploads/2020/07/22165116/Jharkhand_Rustik-Travel_1349x550.jpg'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Registered Tour Operators</h1>
          <p className="text-lg">Tour Operators from All India</p>
        </div>
      </header>

      {/* Main Content */}
      <main id="main" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold">Registered Tour Operators</h2>
        <p className="mt-2 text-gray-600 text-sm">
          Below is a list of travel tour operators who are our trusted local specialists. Contact them today to plan a well-rounded trip to State of {selectedState}, and for getting the best deals.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <h3 className="text-lg font-bold">{selectedState}</h3>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Operators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredOperators.map((op, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-4"
            >
              <h4 className="text-red-600 font-bold text-lg">{op.name}</h4>
              <p className="text-sm mt-2 text-gray-700">Contact Person: {op.contact}</p>
              <p className="text-sm">Address: {op.address}</p>
              <p className="text-sm">City: {op.city}</p>
              <p className="text-sm">Pincode: {op.pincode}</p>
              <p className="text-sm">Phone: {op.phone}</p>
              <p className="text-sm">Mobile: {op.mobile}</p>
              <p className="text-sm">Email: {op.email}</p>
              <a
                href={`https://${op.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-blue-600 hover:underline"
              >
                Website: {op.website}
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}