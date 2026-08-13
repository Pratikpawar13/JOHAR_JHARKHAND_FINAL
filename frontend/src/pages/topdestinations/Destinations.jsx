// src/components/Destinations.jsx
import React, { useRef } from "react";
import "./Destinations.css"; // external CSS
import { ChevronLeft, ChevronRight } from "lucide-react"; //for backward and forward buttons

// import local image(s)
import Netarhat from "../topdestinations/assets/Netarhat.png";
import Dalma_wildlife_Sanctuary from "../topdestinations/assets/dalmawildlife.png";
import Dalma from "../topdestinations/assets/dalma.png";
import Parasnath from "../topdestinations/assets/parasnath.png";
import Maithon_Dam from "../topdestinations/assets/Maithon_Dam.png";
import Maluti_Temple from "../topdestinations/assets/Maluti_Temple.png";

const slides = [
    {
        title: "Netarhat 🌄—",
        image: Netarhat, // ✅ use the imported variable directly
        description:
            "“Queen of Jharkhand Hills”—is a serene hill station of pine forests, rolling plateaus & glowing sunrises. Santhal greetings of “Johar!” 🤝, tribal culture, and nearby Lodh Falls make it a perfect blend of nature & heritage."
    },
    {
        title: "Estrange Bond",
        image: Dalma_wildlife_Sanctuary,
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    },
    {
        title: "The Gate Keeper",
        image: Maluti_Temple,
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    },
    {
        title: "Last Trace Of Us",
        image: Parasnath,
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    },
    {
        title: "Urban Decay",
        image:Maithon_Dam,
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    },
    {
        title: "The Migration",
        image: "https://da.se/app/uploads/2015/09/simon-december1994.jpg",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    }
];

export default function Destinations() {
    const sliderRef = useRef(null);

    const handleClick = (direction) => {
        const slider = sliderRef.current;
        const items = slider.querySelectorAll(".item");
        if (direction === "next") {
            slider.appendChild(items[0]);
        } else {
            slider.prepend(items[items.length - 1]);
        }
    };

    return (
        <section className="blurbg">
        <div className="sectitle">
            <p className="titletext">Hidden Gems of the Tribal Heartland</p>
        </div>
        <main className="dest-main">
            <ul className="slider" ref={sliderRef}>
                {slides.map((s, idx) => (
                    <li
                        key={idx}
                        className="item"
                        /* must be `url(...)` */
                        style={{ backgroundImage: `url(${s.image})` }}
                    >
                        <div className="content">
                            <h2 className="title">{s.title}</h2>
                            <p className="description">{s.description}</p>
                            <button>Read More</button>
                        </div>
                    </li>
                ))}
            </ul>

            <nav className="nav">
                <button className="button prev" onClick={() => handleClick("prev")}>
                    <ChevronLeft size={32} color="white" />
                </button>
                <button className="button next" onClick={() => handleClick("next")}>
                    <ChevronRight size={32} color="white" />
                </button>
            </nav>


        </main>
        </section>
    );
}
