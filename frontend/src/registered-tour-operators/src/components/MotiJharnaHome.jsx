import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";

export default function MotiJharnaHome() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Background Image */}
      <header
        className="w-full h-96 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://i0.wp.com/angdesh.com/wp-content/uploads/2022/07/moti-jharna-waterfall-Sahibganj-3.jpg?w=500&ssl=1'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
        }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold">Moti Jharna</h1>
          <p className="text-xl mt-2">A Scenic Waterfall in Sahibganj</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Explore</h2>
          <div className="mt-4">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${activeTab === "about" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("about")}
              >
                About Moti Jharna
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === "map" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("map")}
              >
                Map
              </button>
            </div>
            {activeTab === "about" && (
              <div>
                <p className="mt-4 text-gray-700">
                  Moti Jharna, also known as the Pearl Waterfall, is a picturesque waterfall located in Sahibganj district, Jharkhand. Nestled amidst lush greenery, this natural wonder is approximately 12 km from Sahibganj town and is a popular spot for nature lovers and photographers. The waterfall cascades down a height of about 30 meters, creating a mesmerizing sight, especially during the monsoon season when water flow is at its peak.
                </p>
                <p className="mt-4 text-gray-700">
                  The surrounding area features rocky terrains and dense forests, offering a serene environment for picnics and short treks. The best time to visit is from July to October when the waterfall is in full flow, though it remains accessible year-round with reduced water levels in the dry season.
                </p>
                <img
                  src="https://visitorvenue.com/wp-content/uploads/2024/10/moti-jharna-thumbnail-image.webp"
                  alt="Moti Jharna Waterfall"
                  className="w-full h-108 object-cover rounded mt-4"
                />
              </div>
            )}
            {activeTab === "map" && (
              <div>
                <p className="mt-4 text-gray-700">
                  Moti Jharna is located approximately 12 km from Sahibganj town in Jharkhand. It is accessible via road, with the nearest railway station at Sahibganj (12 km) and airports at Ranchi (400 km) or Patna (300 km). Below is a map to help you locate the waterfall:
                </p>
                <div className="mt-4">
                  <iframe
                    title="Moti Jharna Map"
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
                <strong>By Road:</strong> Moti Jharna is accessible via a well-maintained road from Sahibganj. Taxis or private vehicles can be hired from Sahibganj town, approximately 12 km away.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src="https://www.gujarattourism.com/content/dam/gujrattourism/images/other-images/by-train.png"
                alt="By Train"
                className="w-16 h-16 mr-4"
              />
              <div>
                <strong>By Train:</strong> The nearest railway station is Sahibganj Railway Station, about 12 km from the waterfall. From there, local transport can take you to the site.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src="https://www.gujarattourism.com/content/dam/gujrattourism/images/other-images/by-air.png"
                alt="By Air"
                className="w-16 h-16 mr-4"
              />
              <div>
                <strong>By Air:</strong> The nearest airport is Birsa Munda Airport in Ranchi, approximately 400 km away. From Ranchi, you can take a train or bus to Sahibganj and then proceed to Moti Jharna.
              </div>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Nearby Attractions</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/" className="relative group block">
              <img
                src="https://www.tataneu.com/pages/travel/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fblogimages%2Ffaqs-about-the-largest-bird-sanctuary-in-india-cadbd95d-67ea-4e14-8432-e49eaa0b6014.webp&w=3840&q=75"
                alt="Udhwa Lake Bird Sanctuary"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Udhwa Lake Bird Sanctuary</p>
              </div>
            </Link>
            <Link to="/teliagarhi-fort" className="relative group block">
              <img
                src="https://angdesh.com/wp-content/uploads/2022/03/cropped-Vikramshila.jpg"
                alt="Teliagarhi Fort"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Teliagarhi Fort</p>
              </div>
            </Link>
            <Link to="/rajmahal-fossil-park" className="relative group block">
              <img
                src="https://tatsatchronicle.com/wp-content/uploads/2022/07/Jharklands-Fossil-Park-480x384.jpg"
                alt="Rajmahal Fossil Park"
                className="w-full h-48 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <p className="font-bold">Rajmahal Fossil Park</p>
              </div>
            </Link>
            <Link to="/ganga-ghat-sahibganj" className="relative group block">
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
      </main>

      <Footer />
    </div>
  );
}