import { useState } from "react";
import "./TouristDept.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import modiji from "../touristDept/modi.jpg";
import tourminister from "../touristDept/tourminister.jpg";
const data = [
    {
        name: "Shri Narendra Modi",
        designation: "Hon'ble Prime Minister of India",
        description: `"Jharkhand — Jahar ke jangal, jharna aur janma bhoomi ka sangam" 🌿  
    From the majestic waterfalls of Hundru and Dassam to the sacred aura of Baidyanath Dham, every corner whispers tales of nature and heritage.  
    The vibrant tribal culture, rich forests, and serene landscapes offer travelers an experience that touches the soul.  
    As the saying goes in local dialect, "Jangal me hi jeevan ka raaz chhupa hai" 🌳✨ — the secrets of life lie hidden in the forests.  
    Guided by the vision of sustainable and inclusive development, Jharkhand today shines as a land where adventure, culture, and spirituality meet in perfect harmony, ensuring every visitor leaves with memories that last a lifetime.`,
        image: modiji,
    },
    {
        name: "Shri Amar Kumar Bauri",
        designation: "Hon'ble Tourism Minister, Jharkhand",
        description: `Jharkhand, the land of forests, waterfalls, and tribal heritage, 
      is emerging as a soulful cultural and eco-tourism destination. 
      From Baba Baidyanath Dham to tribal art villages and eco-adventure spots, 
      the state offers visitors an authentic and enriching experience. 
      The government is committed to sustainable tourism while preserving 
      Jharkhand’s natural and cultural treasures.`,
        image: tourminister,
    },
];

const TouristDept = () => {
    const [index, setIndex] = useState(0);

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="tourist-slider">
            <div className="tourist-wrapper" style={{ transform: `translateX(-${index * 100}%)` }}>
                {data.map((item, idx) => (
                    <div className="tourist-card" key={idx}>
                        <div className="tourist-content">
                            <h2 className="tourist-name">{item.name}</h2>
                            <p className="tourist-designation">{item.designation}</p>
                            <p className="tourist-description">{item.description}</p>
                        </div>
                        <div className="tourist-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                    </div>
                ))}
            </div>

            {/* arrows */}
            <div className="tourist-arrows">
                <button onClick={handlePrev}>
                    <FaArrowLeft />
                </button>
                <button onClick={handleNext}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default TouristDept;
