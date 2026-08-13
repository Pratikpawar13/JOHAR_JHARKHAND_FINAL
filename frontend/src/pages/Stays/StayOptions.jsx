// File: StayOptions.jsx
import React, { useEffect, useRef, useState } from "react";
import heritageImg from "./assets/hotel3.jpg"; // Replace with actual images
import premiumImg from "./assets/hotel2.jpg";
import localImg from "./assets/hotel1.jpg";
import "./stayoptions.css"

export default function StayOptions() {
  const stays = [
    {
      title: "Heritage Hotels",
      desc: "Experience the royal elegance and rich history of Jharkhand.",
      img: heritageImg,
    },
    {
      title: "Premium Hotels",
      desc: "Luxury stays with modern amenities and top-notch comfort.",
      img: premiumImg,
    },
    {
      title: "Local Stays",
      desc: "Authentic homestays and cozy guesthouses for a local feel.",
      img: localImg,
    },
  ];

  return (
    <section className="stay-section">
      <h2 className="stay-title">Plan Your Stay - Choice of Accommodation</h2>
      <div className="stay-cards">
        {stays.map((stay, index) => (
          <div key={index} className="stay-card">
            <img src={stay.img} alt={stay.title} className="stay-img" />
            <div className="stay-overlay">
              <h3>{stay.title}</h3>
              <p>{stay.desc}</p>
              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
