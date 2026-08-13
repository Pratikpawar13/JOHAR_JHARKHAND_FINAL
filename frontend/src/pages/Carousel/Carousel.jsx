import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅
import "./Carousel.css";
import carouselData from "./data";

const TrailCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2); // middle card
  const navigate = useNavigate(); // ✅ hook for navigation

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % carouselData.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2>Pick Your Trail - See Jharkhand - As Per Your Interest</h2>
      </div>

      <div className="carousel-wrapper">
        <button className="nav-btn" onClick={prevSlide}>
        <div className=" left">❮</div>
        </button>

        <div className="carousel">
          {carouselData.map((item, index) => {
            const offset = (index - activeIndex + carouselData.length) % carouselData.length;
            let positionClass = "side-card";
            if (offset === 0) positionClass = "active-card";
            else if (offset === 1 || offset === carouselData.length - 1) positionClass = "near-card";

            return (
              <div key={index} className={`card ${positionClass}`}>
                <img src={item.image} alt={item.title} />
                {positionClass === "active-card" && (
                  <div className="card-overlay">
                    <h3>{item.title}</h3>
                    <button onClick={() => navigate(item.link)}>
                      {item.button}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="nav-btn" onClick={nextSlide}>
          <div className=" right">❯</div>
        </button>
      </div>
    </div>
  );
};

export default TrailCarousel;
