import { useState, useEffect, useRef } from "react";
import JharkhandSVG from "./assets/jharkhand1.svg";
//================JHARKHAND DISTRICT MAPS===========================//
import Deoghar from "./assets/allmaps/deoghar.png"; 
import Ranchi from "./assets/allmaps/ranchi.png";
import Bokaro from "./assets/allmaps/bokaro.png";
import Chatra from "./assets/allmaps/chatra.png";
import Dhanbad from "./assets/allmaps/dhanbad.png";
import Dumka from "./assets/allmaps/dumka.png";
import Eastsinghbhum from "./assets/allmaps/eastsinghbhum.png";
import AttractionSlider from "./AttractionSlider.jsx";

import image1 from "./assets/heritage sites.jpg";
import image2 from "./assets/nat2.jpg";
import image3 from "./assets/nat3.jpg";

import "../Map/map.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const API_KEY = "6944e27ce136d371a9eee3df2c7906a8"; 

export default function JharkhandMap() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select District");
  const [weather, setWeather] = useState(null);
  const dropdownRef = useRef(null);

  const districts = [
    "Ranchi", "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
    "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti",
    "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh",
    "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
  ];

  const districtInfo = {
    Deoghar: {
      title: "🌆 Ranchi — The City of Waterfalls",
      desc: "Ranchi, the capital of Jharkhand, is famous for its stunning waterfalls, lush greenery, and tribal heritage.",
      img: Deoghar,
      coords: [23.3441, 85.3096],
      attractions: [image1, image2, image3],
    },
    Ranchi: {
      title: "🌆 Ranchi — The City of Waterfalls",
      desc: "Ranchi, the capital of Jharkhand, is famous for its stunning waterfalls, lush greenery, and tribal heritage.",
      img: Ranchi,
      coords: [20.3441, 95.3096],
      attractions: [image1, image2, image3],
    },
    Bokaro: {
      title: "🌆 Ranchi — The City of Waterfalls",
      desc: "Ranchi, the capital of Jharkhand, is famous for its stunning waterfalls, lush greenery, and tribal heritage.",
      img: Bokaro,
      coords: [23.3441, 85.3096],
      attractions: [image1, image2, image3],
    },
    Chatra: {
      title: "🌆 Ranchi — The City of Waterfalls",
      desc: "Ranchi, the capital of Jharkhand, is famous for its stunning waterfalls, lush greenery, and tribal heritage.",
      img: Chatra,
      coords: [23.3441, 85.3096],
      attractions: [image1, image2, image3],
    },
    Dhanbad: {
      title: "🌆 Ranchi — The City of Waterfalls",
      desc: "Ranchi, the capital of Jharkhand, is famous for its stunning waterfalls, lush greenery, and tribal heritage.",
      img: Dhanbad,
      coords: [23.3441, 85.3096],
      attractions: [image1, image2, image3],
    },
    Dumka: {
      title: "🌆 Ranchi — The City of Waterfalls",
      desc: "Ranchi, the capital of Jharkhand, is famous for its stunning waterfalls, lush greenery, and tribal heritage.",
      img: Dumka,
      coords: [23.3441, 85.3096],
      attractions: [image1, image2, image3],
    },
    Eastsinghbhum: {
      title: "🌆 Ranchi — The City of Waterfalls",
      desc: "Ranchi, the capital of Jharkhand, is famous for its stunning waterfalls, lush greenery, and tribal heritage.",
      img: Eastsinghbhum,
      coords: [23.3441, 85.3096],
      attractions: [image1, image2, image3],
    }
  };

  const handleSelect = (district) => {
    setSelected(district);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch weather when selected district changes
  useEffect(() => {
    if (!districtInfo[selected]?.coords) return;

    const [lat, lon] = districtInfo[selected].coords;

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.main.temp),
          desc: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        });
      } catch (err) {
        console.error("Weather fetch failed:", err);
        setWeather(null);
      }
    }

    fetchWeather();
  }, [selected]);

  const activeInfo = districtInfo[selected] || {
    title: "🌿 Jharkhand — Where Nature Whispers, “Johar!”",
    desc: "Land of hills, sal forests, and sacred rivers, where every sunrise sings tribal songs of life. As the Santhals say — “Disom katha Johar!” 🤝✨",
    img: JharkhandSVG
  };

  return (
    <div className="mapcontainer">
      {/* Dropdown */}
      <div ref={dropdownRef} className="selection">
        <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
          <span>{selected}</span>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {open && (
          <ul className="dropdown-list">
            {districts.map((district, index) => (
              <li 
                key={index} 
                className="dropdown-item" 
                onClick={() => handleSelect(district)}
              >
                {district}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Info + Weather + slider */}
      <div className="infobox">
        <div className="maptitle">
          <p>{activeInfo.title}</p>
          <p className="mdesc">{activeInfo.desc}</p>

          {weather && (
            <div className="weather-box">
              <img src={weather.icon} alt="weather icon" />
              <span>{weather.temp}°C — {weather.desc}</span>
            </div>
          )}
        </div>

        {activeInfo.attractions && (
          <AttractionSlider images={activeInfo.attractions} />
        )}
      </div>

      {/* Map Image */}
      <div className="mapbox">
        <img 
          src={activeInfo.img} 
          alt={`${selected} Map`} 
          style={{ width: "100%", height: "100%", objectFit: "contain" }} 
        />
      </div>
    </div>
  );
}
