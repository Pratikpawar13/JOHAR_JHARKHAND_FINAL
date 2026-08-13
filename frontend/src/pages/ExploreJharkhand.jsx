import { useState } from "react";
import { Link } from "react-router-dom";

// Example data (replace with your real data)
const images = [
  { id: 1, src: "/images/ranchi1.jpg", name: "Ranchi Lake", link: "/destinations/ranchi-lake" },
  { id: 2, src: "/images/ranchi2.jpg", name: "Jagannath Temple", link: "/destinations/jagannath-temple" },
  { id: 3, src: "/images/ranchi3.jpg", name: "Rock Garden", link: "/destinations/rock-garden" },
];

export default function ExploreJharkhand() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-ranchi.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl">
        {/* Left Info Card */}
        <div className="bg-white/95 rounded-2xl shadow-lg p-6 md:w-2/3">
          <h2 className="text-2xl font-bold mb-2 text-orange-600">Ranchi</h2>
          <p className="text-gray-700 mb-4">
            Ranchi is the capital of Jharkhand, India, renowned as the "City of Waterfalls" for its numerous scenic cascades. 
            Located on the Ranchi Plateau, it was the former summer capital of Bihar and served as a significant center during 
            the Jharkhand movement for statehood.
          </p>
          {/* Weather */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500 text-2xl">☁️</span>
            <span className="text-gray-800 font-semibold">30°</span>
            <span className="text-sm text-gray-500">overcast clouds</span>
          </div>

          {/* Image Slider */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              ←
            </button>
            <div className="flex gap-3 overflow-hidden">
              {images.map((img, index) => (
                <Link
                  key={img.id}
                  to={img.link}
                  className={`relative w-40 h-28 rounded-xl overflow-hidden shadow-md transform transition duration-300 hover:scale-105 ${
                    index === currentIndex ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover Name Overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition">
                    {img.name}
                  </div>
                </Link>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Right Side Jharkhand Map */}
        <div className="hidden md:block md:w-1/3 flex justify-center">
          <img
            src="/images/jharkhand-map.png"
            alt="Jharkhand Map"
            className="w-72 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
