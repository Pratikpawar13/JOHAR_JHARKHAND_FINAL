import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Auto play background ambient music softly
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <footer className="relative bg-white/5 backdrop-blur-lg border border-white/10 text-black pt-16 pb-10 font-inter">

      {/* Background ambient music */}
      <audio ref={audioRef} loop>
        <source src="/ambient-music.mp3" type="audio/mpeg" />
      </audio>

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Pick Your Trail
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              <li><a href="#" className="hover:text-[#8B4513]">Adventure Tourism</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Eco Tourism</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Heritage Tourism</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Dams & Lakes</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Religious Tourism</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Spiritual Tourism</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Museum & Art Gallery</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Tribal Tourism</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Wildlife Sanctuaries</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Start Your Journey
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              <li><a href="#" className="hover:text-[#8B4513]">Ranchi</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Jamshedpur</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Deoghar</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Dhanbad</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Bokaro</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Sahibganj</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Palamu</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Hazaribagh</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Travel Itineraries
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              <li><a href="#" className="hover:text-[#8B4513]">Suggested Itineraries</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Customized Tours</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Themed Tours</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">LTC Approved Tour Operators</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Registered Tour Operators</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Registered Tourist Guides</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Plan Your Stay
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              <li><a href="#" className="hover:text-[#8B4513]">Hotels</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Heritage Hotels</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Registered Homestays</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Guest Houses</a></li>
            </ul>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Online Booking
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              <li><a href="#" className="hover:text-[#8B4513]">Accommodation</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Tour Packages</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Visual Library
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              <li><a href="#" className="hover:text-[#8B4513]">Picture Gallery</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Video Gallery</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Virtual Tours</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Audio Gallery</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Brochures</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Articles</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Blogs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Helpful Links
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              <li><a href="#" className="hover:text-[#8B4513]">About Jharkhand</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">News & Updates</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Contact Us</a></li>
              <button 
                  onClick={() => navigate('/feedback')}
                  className="hover:text-[#8B4513] text-left cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
                >
                  Feedback Form
                </button>
              <li><a href="#" className="hover:text-[#8B4513]">Jharkhand Cine Hub</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Proactive Disclosure</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Covid-19 Advisory</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Recruitment Rules</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">RTI Authority</a></li>
              <li>
                <button 
                  onClick={() => navigate('/auth')}
                  className="hover:text-[#8B4513] text-left cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
                >
                  Login
                </button>
              </li>

            </ul>
          </div>
          <div>
            <h3 className="text-orange-400 font-playfair text-xl md:text-2xl mb-2 pb-1">
              Investment Opportunities
            </h3>
            <ul className="space-y-2 text-black transition-colors duration-300">
              
              <li><a href="#" className="hover:text-[#8B4513]">Business Opportunity</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Tender</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Grievance Redressal</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">E-Payment</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Disclaimer</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Sitemap</a></li>
              <li><a href="#" className="hover:text-[#8B4513]">Useful Links</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 mb-8 opacity-20" />

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm md:text-base space-y-4 md:space-y-0">
          <div className="text-center md:text-left space-y-1 text-gray-700">
            <p>Registered Office:</p>
            <p>Udyog Bhawan, Block No. 16, 4th Floor, Sector-11, Gandhinagar - 382010.</p>
            <p>Tel: 079-23977219 | Toll Free: 1800 203 1111</p>
            <p>Email: info@jharkhandtourism.com | CIN: U63040GJ1978SGC003047</p>
          </div>
          <img
            src="https://www.joharjharkhand.org/wp-content/uploads/2024/04/JOHAR-JHARKHAND-LOGO-01.png"
            alt="Jharkhand Tourism Logo"
            className="w-28 h-auto"
          />
          <div className="text-center md:text-right text-gray-700">
            <p>Visitor: 7,151,776</p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 flex justify-center">
          <form className="flex shadow-lg">
            <input
              type="email"
              placeholder="Enter your e-mail"
              className="px-5 py-3 rounded-l-lg bg-white/20 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 transition-colors rounded-r-lg font-bold"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © 2025 Jharkhand Tourism. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
