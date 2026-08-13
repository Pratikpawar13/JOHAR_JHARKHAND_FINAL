import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("place");

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className="h-96 bg-cover bg-center flex items-center justify-center text-white relative"
        style={{
          backgroundImage: `url('https://www.tataneu.com/pages/travel/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fblogimages%2Ffaqs-about-the-largest-bird-sanctuary-in-india-cadbd95d-67ea-4e14-8432-e49eaa0b6014.webp&w=3840&q=75'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
        }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold">Udhwa Lake Bird Sanctuary</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Explore</h2>
          <div className="mt-4">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${activeTab === "place" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("place")}
              >
                About Place
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === "map" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("map")}
              >
                Map
              </button>
            </div>
            {activeTab === "place" && (
              <div>
                <p className="text-gray-700">
                  Udhwa Lake Bird Sanctuary is located approximately 10 km from Sahibganj in Jharkhand, making it an ideal day trip destination. Situated in a low-lying floodplain along the Ganges River, the sanctuary spans 5.65 sq km and includes a series of interconnected lakes and wetlands. This region serves as a critical habitat for over 100 bird species, including migratory birds like the fishing eagle and Brahminy kite. The sanctuary features diverse ecosystems with dense vegetation and seasonal water levels, offering nesting grounds for birds. Visitors can explore the area via guided tours or boat rides during the dry season.
                </p>
                <section className="bg-gray-200 p-6 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-semibold text-green-700">About Location</h2>
                  <p className="mt-4 text-gray-700">
                    Udhwa Lake Bird Sanctuary is a stunning natural haven located in <b>Sahibganj district</b> of Jharkhand. Spread over an area of 5.65 sq km, this sanctuary is a paradise for bird watchers and nature enthusiasts. It is the only bird sanctuary in Jharkhand and home to various species of birds including house swifts, fishing eagles, Brahminy kites, swifts, and many migratory birds.
                  </p>
                  <p className="mt-4 text-gray-700">
                    The history of Udhwa Lake dates back to its formation as backwater lakes. In 1991, it was declared a sanctuary under the Wildlife Protection Act to protect its bird population and wetland ecosystem. In 2024, it was designated as a Ramsar site, recognizing its ecological importance as the largest natural Gangetic floodplain wetland in Jharkhand. The designation provides a framework for conservation and sustainable use, acknowledging its socio-economic value to local communities.
                  </p>
                  <p className="mt-4 text-gray-700">
                    The best time to visit Udhwa Lake Bird Sanctuary is during the winter months from November to March. During this time, migratory birds flock to the sanctuary in large numbers, creating a spectacular sight for visitors. The sanctuary also has resident bird species that can be spotted throughout the year.
                  </p>
                  <p className="mt-4 text-gray-700">
                    Overall, a visit to Udhwa Lake Bird Sanctuary is a great way to unwind and reconnect with nature. The sanctuary's serene atmosphere, breathtaking views, and diverse bird species make it a perfect weekend getaway for families and nature enthusiasts. It is a must-visit destination for anyone visiting Jharkhand.
                  </p>
                  <img
                    src="https://media.assettype.com/outlooktraveller%2F2025-06-06%2Fnqm4u9xa%2Fkhinchan-wetland.jpg?w=480&auto=format%2Ccompress&fit=max"
                    alt="Bird Sanctuary images"
                    className="w-full h-96 object-cover rounded"
                  />
                </section>
              </div>
            )}
            {activeTab === "map" && (
              <div>
                <p className="text-gray-700">
                  Exploring Udhwa Lake Bird Sanctuary is made easier with its strategic location near Sahibganj. The sanctuary is approximately 10 km from Sahibganj town, accessible via road, with the nearest railway station at Udhwa (10 km) and airports at Ranchi (431 km) or Patna (300 km). Below is a map to help you locate the sanctuary:
                </p>
                <div className="mt-4">
                  <iframe
                    title="Udhwa Lake Bird Sanctuary Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.123456!2d87.654321!3d25.246810!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE0JzQ4LjM2Ik4gODfCsDM5JzE1LjY0IkU!5e0!3m2!1sen!2sin!4v1693819200!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-orange-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">How to Get There</h2>
          <ul className="mt-4 text-gray-700 space-y-4">
            <li className="flex items-start">
              <img
                src="https://www.gujarattourism.com/content/dam/gujrattourism/images/other-images/by-road.png"
                alt="By Road"
                className="w-16 h-16 mr-4"
              />
              <div>
                <strong>By Road:</strong> Jharkhand has a well-developed road network. Sahibganj is connected to major cities and towns by road. State and private buses or taxis are great options to travel from nearby areas like Rajmahal (13 km away).
              </div>
            </li>
            <li className="flex items-start">
              <img
                src="https://www.gujarattourism.com/content/dam/gujrattourism/images/other-images/by-train.png"
                alt="By Train"
                className="w-16 h-16 mr-4"
              />
              <div>
                <strong>By Train:</strong> The nearest railway station is Udhwa (10 km away) or Sahibganj Railway Station, which is a major railhead on the Eastern Railway zone with frequent trains.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src="https://www.gujarattourism.com/content/dam/gujrattourism/images/other-images/by-air.png"
                alt="By Air"
                className="w-16 h-16 mr-4"
              />
              <div>
                <strong>By Air:</strong> The nearest airports are Ranchi (Birsa Munda Airport, 431 km away) or Patna (300 km away). From there, you can take a train or road transport to Sahibganj.
              </div>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Registered Tour Operators</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded shadow hover:bg-blue-100 transition">
              <h3 className="font-bold text-blue-800">Jha Travels</h3>
              <p>Phone: 017078</p>
              <p>Website: www.jharkhandtravels.com</p>
            </div>
            <div className="bg-blue-50 p-4 rounded shadow hover:bg-blue-100 transition">
              <h3 className="font-bold text-blue-800">Devi Travels</h3>
              <p>Phone: 017078</p>
              <p>Website: www.jharkhandtravels.com</p>
            </div>
            <div className="bg-blue-50 p-4 rounded shadow hover:bg-blue-100 transition">
              <h3 className="font-bold text-blue-800">Vishwa Travels</h3>
              <p>Phone: 017078</p>
              <p>Website: www.jharkhandtravels.com</p>
            </div>
          </div>
          <Link to="/operators" className="mt-4 block text-blue-600 hover:underline">See More</Link>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Registered Tourist Guides</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded shadow hover:bg-green-100 transition">
              <h3 className="font-bold text-green-800">Pankaj Kumar</h3>
              <p>Mobile: 1234567890</p>
            </div>
            <div className="bg-green-50 p-4 rounded shadow hover:bg-green-100 transition">
              <h3 className="font-bold text-green-800">Upendra Kumar</h3>
              <p>Mobile: 1234567890</p>
            </div>
            <div className="bg-green-50 p-4 rounded shadow hover:bg-green-100 transition">
              <h3 className="font-bold text-green-800">Alok Sharma</h3>
              <p>Mobile: 1234567890</p>
            </div>
          </div>
          <Link to="/registered-tour-guides" className="mt-4 block text-green-600 hover:underline">See More</Link>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Nearby Attractions</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/moti-jharna" className="relative group">
              <img
                src="https://i0.wp.com/angdesh.com/wp-content/uploads/2022/07/moti-jharna-waterfall-Sahibganj-3.jpg?w=500&ssl=1"
                alt="Moti Jharna"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Moti Jharna</p>
              </div>
            </Link>
            <Link to="/teliagarhi-fort" className="relative group">
              <img
                src="https://angdesh.com/wp-content/uploads/2022/03/cropped-Vikramshila.jpg"
                alt="Teliagarhi Fort"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Teliagarhi Fort</p>
              </div>
            </Link>
            <Link to="/rajmahal-fossil-park" className="relative group">
              <img
                src="data:image/jpeg;base64,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"
                alt="Rajmahal Fossil Park"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Rajmahal Fossil Park</p>
              </div>
            </Link>
            <Link to="/ganga-ghat-sahibganj" className="relative group">
              <img
                src="https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/07/08/Pictures/pressure-constructed-neeldhara-chandighat-haridwar-development-rameshwar_3054507a-c081-11ea-b246-8f7a5e10b5dd.jpg"
                alt="Ganga Ghat Sahibganj"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Ganga Ghat Sahibganj</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Where to Stay</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
                alt="Silver Arcade Hotels"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Silver Arcade Hotels</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/15/ce/2d/hotel-metro-palace.jpg?w=900&h=500&s=1"
                alt="Metro Palace Guest House"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Metro Palace Guest House</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://continentallodge.com/images/resource/blog-list3.jpg"
                alt="Continental Lodge"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Continental Lodge</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}