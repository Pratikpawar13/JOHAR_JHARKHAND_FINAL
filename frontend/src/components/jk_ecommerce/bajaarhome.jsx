// File: src/pages/EcomHome.jsx
import React, { useEffect, useRef, useState } from "react";
import image1 from "../jk_ecommerce/assets/images/i1.jpg";
import image2 from "../jk_ecommerce/assets/images/i2.jpg";
import image3 from "../jk_ecommerce/assets/images/i3.jpg";
import image4 from "../jk_ecommerce/assets/images/i6.jpg";
import image5 from "../jk_ecommerce/assets/images/i5.jpg";
import PRODUCTS from "./products";

const slides = [
    {
        id: 1,
        leftTop: "Heritage",
        leftMain: "Masks of Jharkhand",
        leftSub: "Tribal Expressions",
        cta: "Explore Masks",
        image: image1,
    },
    {
        id: 2,
        leftTop: "Eco-Friendly",
        leftMain: "Bamboo & Cane",
        leftSub: "Crafts of Nature",
        cta: "Shop Bamboo Works",
        image: image2,
    },
    {
        id: 3,
        leftTop: "Ornamental",
        leftMain: "Local Jewellery",
        leftSub: "Handcrafted Elegance",
        cta: "Discover Jewellery",
        image: image3,
    },
    {
        id: 4,
        leftTop: "Art Legacy",
        leftMain: "Paitkar Painting",
        leftSub: "Scroll Storytelling",
        cta: "View Paintings",
        image: image4,
    },
    {
        id: 5,
        leftTop: "Tribal Aesthetics",
        leftMain: "Dokra Art",
        leftSub: "Lost-Wax Casting",
        cta: "Shop Artefacts",
        image: image5,
    },
];

export default function EcomHome() {
    const [index, setIndex] = useState(0);
    const delay = 4500;
    const timeoutRef = useRef(null);

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, delay);
        return () => {
            resetTimeout();
        };
    }, [index]);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
            {/* Navbar */}
            <header className="bg-amber-700 text-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="font-bold text-xl tracking-wide flex items-center gap-2">
                            <span className="text-2xl">🌿</span>
                            <span>JOHAR BAZAAR</span>
                        </div>
                        <nav className="hidden md:flex gap-6 text-sm opacity-90">
                            <a href="#" className="hover:text-yellow-300">Masks</a>
                            <a href="#" className="hover:text-yellow-300">Bamboo Crafts</a>
                            <a href="#" className="hover:text-yellow-300">Jewellery</a>
                            <a href="#" className="hover:text-yellow-300">Paintings</a>
                            <a href="#" className="hover:text-yellow-300">Dokra Artefacts</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block">
                            <input
                                placeholder="Search Jharkhand Treasures..."
                                className="w-64 px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <button className="p-2 rounded-md hover:bg-white/20">👤</button>
                        <button className="p-2 rounded-md hover:bg-white/20">🛒</button>
                    </div>
                </div>
            </header>


            {/* Hero Carousel */}

            <main className="pt-6 " >
                <div className="max-w-12xl mx-auto px-4 sm:p-6">
                    <div className="bg-gradient-to-b from-orange-100 to-white p-5 rounded-2xl">
                        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white p-2">

                            {/* Track */}
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${index * 100}%)` }}
                            >
                                {slides.map((s) => (
                                    <div key={s.id} className="min-w-full flex items-center">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full px-10">
                                            {/* Left text */}
                                            <div className="p-8 lg:pl-12 lg:pr-8">
                                                <div className="text-2xl md:text-3xl font-serif text-amber-800">
                                                    {s.leftTop}
                                                </div>
                                                <h1 className="mt-2 text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-900 leading-[1.1]">
                                                    {s.leftMain}
                                                </h1>
                                                <div className="text-2xl text-amber-700 mt-2">{s.leftSub}</div>
                                                <p className="mt-4 text-gray-700 max-w-xl">
                                                    Discover Jharkhand’s cultural treasures — crafted by skilled artisans with heritage and sustainability.
                                                </p>
                                                <button className="mt-6 inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:opacity-95 hover:scale-105 transition">
                                                    {s.cta}
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Right image */}
                                            <div className="p-4 flex justify-center items-center">
                                                <img
                                                    loading="lazy"
                                                    src={s.image}
                                                    alt={s.leftMain}
                                                    className="object-cover w-full h-80 lg:h-[520px] rounded-lg shadow-md hover:scale-105 transition"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Arrows inside carousel */}
                            <button
                                aria-label="Previous slide"
                                onClick={prev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center 
                     w-12 h-12 rounded-full bg-white/80 shadow-md hover:bg-white hover:scale-110 
                     transition z-10"
                            >
                                <svg className="w-6 h-6 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <button
                                aria-label="Next slide"
                                onClick={next}
                                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center 
                     w-12 h-12 rounded-full bg-white/80 shadow-md hover:bg-white hover:scale-110 
                     transition z-10"
                            >
                                <svg className="w-6 h-6 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                                </svg>
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setIndex(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`w-3 h-3 rounded-full ${idx === index ? "bg-amber-700" : "bg-gray-300"} transition`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

           <PRODUCTS/>

        </div>
    );
}
