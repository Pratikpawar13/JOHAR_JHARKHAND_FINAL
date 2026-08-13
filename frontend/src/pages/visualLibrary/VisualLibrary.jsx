// File: src/pages/visualLibrary/Components/VisualLibrary.jsx
import React from "react";
import "./VisualLibrary.css";

import photos from "./assets/photos.jpg";   // Replace with actual image path
import videos from "./assets/videos.jpg";       // Replace with actual image path
import virtualtours from "./assets/virtualtours.jpg";      // Replace with actual image path

export default function VisualLibrary() {
  const cards = [
    {
      title: "PHOTOS",
      img:photos,
      link: "https://gujarattourism.com/video-gallery.html",
    },
    {
      title: "VIDEOS",
      img: videos,
      link: "https://gujarattourism.com/video-gallery.html",
    },
    {
      title: "VIRTUAL TOURS",
      img: virtualtours,
      link: "https://gujarattourism.com/video-gallery.html",
    },
  ];

  return (
    <section className="visual-library">
      <h2 className="vl-title">Visual Library - See, Hear and Visit</h2>
      <div className="vl-cards">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="vl-card"
          >
            <img src={card.img} alt={card.title} />
            <div className="vl-gradient"></div>
            <div className="vl-overlay">{card.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
