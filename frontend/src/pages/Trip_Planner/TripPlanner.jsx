import React, { useEffect, useRef, useState } from "react";
import "./TripPlanner.css";

export default function TripPlanner() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // 20% visible before triggering
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`trip-maincontainer glass ${isVisible ? "fade-in" : "fade-out"}`}
    >
      <div className="trip-content">
        <h1>Trip Planner – Your Personal Itinerary</h1>
        <p>
          Our trip planner makes your holiday booking a pleasure.  
          Set the dates and pick your activities – we’ll guide you through the rest.
        </p>

        <button className="planner-btn">
          Plan Trip Now <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
}
