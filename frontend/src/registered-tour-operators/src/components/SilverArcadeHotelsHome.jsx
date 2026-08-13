import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";

export default function SilverArcadeHotelsHome() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Background Image */}
      <header
        className="w-full h-96 bg-cover bg-center flex items-center justify-center text-white relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
        }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold">Silver Arcade Hotels</h1>
          <p className="text-xl mt-2">A Heritage Stay in Rajkot</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Explore</h2>
          <div className="mt-4">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${activeTab === "overview" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === "facilities" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("facilities")}
              >
                Facilities
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === "notes" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === "reviews" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>
            {activeTab === "overview" && (
              <div>
                <p className="text-gray-700">
                  Silver Arcade Hotels is a distinguished heritage hotel nestled in the heart of Rajkot, Gujarat. Constructed in 1930 as a residence for a prominent local merchant, this elegant property has been meticulously restored to preserve its vintage allure while incorporating the modern comforts of a premier business hotel. Highly recommended by the Lonely Planet Guide, Rough Guide, and the esteemed British travel guide 'Sawday's - Places to Stay in India', it stands out as the top heritage hotel in Rajkot’s accommodations.
                </p>
                <p className="mt-4 text-gray-700">
                  The hotel features twelve rooms and suites, one executive suite, two celebrated restaurants, a conference hall, an indoor swimming pool, and a fitness center. Additionally, it houses an on-site art gallery and a boutique shop showcasing handcrafted items by local Rajkot artisans.
                </p>
                <p className="mt-4 text-gray-700">
                  ‘Saffron Terrace’, its rooftop dining venue, is an acclaimed Gujarati thali restaurant offering authentic regional cuisine in a traditional fine-dining setting. ‘The Spice Garden’, its courtyard café, delights guests with a diverse ala carte menu featuring Gujarati, Rajasthani, and South Indian dishes, alongside fresh seasonal juices, artisanal ice-creams, and a selection of teas and coffees. The Spice Garden is vegetarian, with eggs served only during breakfast.
                </p>
                <p className="mt-4 text-gray-700">
                  The hotel offers ‘Saffron Lounge & Courtyard’ as a relaxed yet functional conference and meeting space. Its ‘Emerald Pool’ is renowned as one of Rajkot’s most luxurious indoor swimming pools, complemented by a patio and fitness center.
                </p>
                <p className="mt-4 text-gray-700">
                  Silver Arcade Hotels enjoys a prime city-center location with ample parking, including valet service. Both the Rajkot Airport and Railway Station are within an 8 km radius. This venture is spearheaded by Vikram Patel.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
                  alt="Silver Arcade Hotels"
                  className="w-full h-96 object-cover rounded mt-4"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Silver+Arcade+Hotels"; }}
                />
              </div>
            )}
            {activeTab === "facilities" && (
              <div>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>WiFi Internet connectivity.</li>
                  <li>Spacious bathrooms with high-pressure showers.</li>
                  <li>Efficient split air-conditioning, ceiling fans, and openable windows.</li>
                  <li>32" LED TV with satellite channels.</li>
                  <li>Mini refrigerator with international minibar.</li>
                  <li>DVD/CD player with MP3 compatibility and satellite radio.</li>
                  <li>In-room movie and music library.</li>
                  <li>Extensive book collection.</li>
                  <li>Choice of queen-size twin beds or double bed with 9" thick mattress, feather pillows, and plush duvets.</li>
                  <li>Electric kettle with complimentary tea and coffee.</li>
                  <li>Comfortable armchairs and rocking chairs in select rooms.</li>
                  <li>Large desk with multi-outlet power strip for easy connectivity.</li>
                  <li>Wardrobe with digital safe.</li>
                  <li>Direct-dial telephones.</li>
                </ul>
              </div>
            )}
            {activeTab === "notes" && (
              <div>
                <ul className="list-decimal pl-5 text-gray-700 space-y-2">
                  <li>Rates are exclusive of tax/Extra bed - 15% of room rate.</li>
                  <li>Day Rate - 50% of room rate applicable between 9 AM and 6 PM.</li>
                  <li>Dollar & Euro Rates are based on exchange rates existing in April 2009 & are subject to change.</li>
                </ul>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Review</label>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows="4"
                      placeholder="Write your review"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Submit
                  </button>
                </form>
                <p className="mt-4 text-green-600">Success! Thank you!</p>
                <p className="text-red-600">Invalid! invalid form</p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Book Your Stay</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700">Check-in Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                min="2025-09-05"
              />
            </div>
            <div>
              <label className="block text-gray-700">Check-out Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                min="2025-09-06"
              />
            </div>
            <div>
              <label className="block text-gray-700">Guests</label>
              <select className="w-full p-2 border rounded">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Book Now
            </button>
          </form>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Gallery</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Hotel Exterior"
              className="w-full h-48 object-cover rounded"
              onError={(e) => { e.target.src = "https://via.placeholder.com/384x192?text=Hotel+Exterior"; }}
            />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Saffron Terrace"
              className="w-full h-48 object-cover rounded"
              onError={(e) => { e.target.src = "https://via.placeholder.com/384x192?text=Saffron+Terrace"; }}
            />
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792tyoee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Emerald Pool"
              className="w-full h-48 object-cover rounded"
              onError={(e) => { e.target.src = "https://via.placeholder.com/384x192?text=Emerald+Pool"; }}
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Nearby Attractions</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/" className="relative group block">
              <img
                src="https://www.tataneu.com/pages/travel/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fblogimages%2Ffaqs-about-the-largest-bird-sanctuary-in-india-cadbd95d-67ea-4e14-8432-e49eaa0b6014.webp&w=3840&q=75"
                alt="Udhwa Lake Bird Sanctuary"
                className="w-full h-48 object-cover rounded"
                onError={(e) => { e.target.src = "https://via.placeholder.com/384x192?text=Bird+Sanctuary"; }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Udhwa Lake Bird Sanctuary</p>
              </div>
            </Link>
            <Link to="/moti-jharna" className="relative group block">
              <img
                src="https://i0.wp.com/angdesh.com/wp-content/uploads/2022/07/moti-jharna-waterfall-Sahibganj-3.jpg?w=500&ssl=1"
                alt="Moti Jharna"
                className="w-full h-48 object-cover rounded"
                onError={(e) => { e.target.src = "https://via.placeholder.com/384x192?text=Moti+Jharna"; }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Moti Jharna</p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}