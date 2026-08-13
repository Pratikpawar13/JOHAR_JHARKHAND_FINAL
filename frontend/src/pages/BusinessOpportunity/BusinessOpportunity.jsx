

// import policyImg from "../visualLibrary/assets/photos.jpg";  // File: src/pages/businessOpportunity/BusinessOpportunity.jsx
import React, { useEffect, useRef, useState } from "react";
import "./BusinessOpportunity.css";

import ecoTourismImg from "./assets/ecotourism.jpg";
import natureImg from "./assets/nature.jpg";
import filmImg from "./assets/film.jpg";
import organicImg from "./assets/herbal.jpg";
import dairyImg from "./assets/Dairy.jpg";
import handicraftImg from "./assets/handicrafts.jpg";
import logisticsImg from "./assets/transport.jpg";

export default function BusinessOpportunity() {
    // ORIGINAL slides (3 distinct items repeated to create more content)
    const baseSlides = [
        {
            title: "Eco-Tourism & Homestays",
            img: ecoTourismImg, // waterfalls, forests, tribal homestay
            link: "#",
        },
        {
            title: "Nature & Adventure Tourism",
            img: natureImg, // trekking, wildlife safari, adventure sports
            link: "#",
        },
        {
            title: "Film & Media Production",
            img: filmImg, // film camera or shooting set
            link: "#",
        },
        {
            title: "Organic Farming & Herbal Products",
            img: organicImg, // herbal plants, organic veggies
            link: "#",
        },
        {
            title: "Dairy & Allied Farming",
            img: dairyImg, // milk, cheese, livestock
            link: "#",
        },
        {
            title: "Handloom, Handicrafts & Tribal Art",
            img: handicraftImg, // Sohrai/Kohbar painting or Dokra art
            link: "#",
        },
        {
            title: "Logistics & Transport Services",
            img: logisticsImg, // trucking, warehousing
            link: "#",
        },
    ];

    // responsive visible count (3 / 2 / 1)
    const getVisible = () => {
        if (typeof window === "undefined") return 3;
        if (window.innerWidth >= 1100) return 3;
        if (window.innerWidth >= 700) return 2;
        return 1;
    };

    const [visible, setVisible] = useState(getVisible());
    useEffect(() => {
        const onResize = () => setVisible(getVisible());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // build duplicated slide array with clones at both ends (clone count = visible)
    const slides = baseSlides;
    const cloneCount = visible;
    const leftClones = slides.slice(-cloneCount);
    const rightClones = slides.slice(0, cloneCount);
    const trackSlides = [...leftClones, ...slides, ...rightClones]; // length = slides.length + 2*visible

    // starting index = cloneCount (so visible area shows the real first slides)
    const [index, setIndex] = useState(cloneCount);
    const trackRef = useRef(null);
    const sectionRef = useRef(null);

    // Intersection observer to show/hide on scroll (lazy reveal)
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => setInView(e.isIntersecting));
            },
            { threshold: 0.18 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    // autoplay
    const intervalMs = 4200;
    const transitionMs = 600;
    const timerRef = useRef(null);

    const enableTransition = () => {
        if (trackRef.current)
            trackRef.current.style.transition = `transform ${transitionMs}ms ease`;
    };
    const disableTransition = () => {
        if (trackRef.current) trackRef.current.style.transition = "none";
    };

    const goNext = () => {
        enableTransition();
        setIndex((s) => s + 1);
    };
    const goPrev = () => {
        enableTransition();
        setIndex((s) => s - 1);
    };

    // autoplay only when the section is in view
    useEffect(() => {
        if (inView) {
            timerRef.current = setInterval(() => goNext(), intervalMs);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, visible]); // restart when visibility or visibleCount changes

    // when visible (responsive) changes, re-centre to its cloneCount
    useEffect(() => {
        disableTransition();
        setIndex(cloneCount);
        // re-enable next frame
        requestAnimationFrame(() => {
            enableTransition();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    // update transform when index changes
    useEffect(() => {
        if (!trackRef.current) return;
        const movePercent = -(index * (100 / visible));
        trackRef.current.style.transform = `translateX(${movePercent}%)`;

        // If we just jumped (transition: none) re-enable for further moves after tiny tick
        const t = setTimeout(() => {
            if (trackRef.current && trackRef.current.style.transition === "none") {
                trackRef.current.style.transition = `transform ${transitionMs}ms ease`;
            }
        }, 20);
        return () => clearTimeout(t);
    }, [index, visible]);

    // handle seamless wrap after CSS transition finishes
    const onTransitionEnd = () => {
        // forward wrap: if we moved over the last real slide area
        if (index >= slides.length + cloneCount) {
            // jump back by slides.length (no animation) to equivalent real index
            disableTransition();
            setIndex((prev) => prev - slides.length);
            // re-enable transition on next paint (happens in the effect above)
        }
        // backward wrap: if we moved before the left clones
        if (index < cloneCount) {
            disableTransition();
            setIndex((prev) => prev + slides.length);
        }
    };

    // pause autoplay while user hovers controls / carousel
    const onMouseEnter = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    const onMouseLeave = () => {
        if (!timerRef.current && inView) {
            timerRef.current = setInterval(() => goNext(), intervalMs);
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`bo-section ${inView ? "active" : ""}`}
            style={{ "--visible": visible }}
        >
            <div className="bo-inner">
                <div className="bo-header">
                    <h2>Business Opportunities - Welcome to Jharkhand</h2>
                    <a className="bo-viewmore" href="#">
                        View More
                    </a>
                </div>


                <div
                    className="bo-viewport"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <div
                        className="bo-track"
                        ref={trackRef}
                        onTransitionEnd={onTransitionEnd}
                        // initial transition style
                        style={{ transition: `transform ${transitionMs}ms ease` }}
                    >
                        {trackSlides.map((s, i) => (
                            <div className="bo-card" key={i}>
                                <a href={s.link} className="bo-card-inner" target="_blank" rel="noreferrer">
                                    <div className="bo-thumb">
                                        <img src={s.img} alt={s.title} />
                                    </div>
                                    <div className="bo-caption">
                                        <p>{s.title}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* controls (below the cards) */}
                <div className="bo-controls" aria-hidden={false}>
                    <button
                        className="bo-arrow bo-prev"
                        onClick={() => {
                            onMouseEnter();
                            goPrev();
                        }}
                        aria-label="Previous"
                    >
                        <span className="arrow">←</span>
                    </button>

                    <button
                        className="bo-arrow bo-next"
                        onClick={() => {
                            onMouseEnter();
                            goNext();
                        }}
                        aria-label="Next"
                    >
                        <span className="arrow">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
