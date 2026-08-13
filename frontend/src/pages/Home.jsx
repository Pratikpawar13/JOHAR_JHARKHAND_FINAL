import Hero from '../components/sub-components/Hero.jsx'
import AttractionCard from "../components/sub-components/AttractionCard.jsx";
import SectionHeader from "../components/sub-components/SectionHeader.jsx";
import destinations from "../components/Destination/destinations.js";
import bgImage from "../../assets/Images/j2.jpg";
import Carousel from "../components/Carousel/Carousel.jsx";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  return (
    <>
      <Hero />

      {/* 🔥 Gujarat-style Carousel with View All */}
      <section className="my-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Explore Jharkhand</h2>
          <a
            href="/view-all"
            className="text-orange-600 hover:underline font-medium"
          >
            View All →
          </a>
        </div>
        <Carousel />
      </section>

      {/* Top Destinations */}
      <section id="featured" className="section container-p">
        <SectionHeader
          title="Top Destinations"
          subtitle="Handpicked places you shouldn’t miss"
        />

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-6"
        >
          {destinations.slice(0, 6).map((d) => (
            <SwiperSlide key={d.slug}>
              <AttractionCard item={d} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Plan Your Trip Section */}
      <section
        id="plan"
        className="relative w-full bg-cover bg-center bg-no-repeat py-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container mx-auto flex justify-start px-4">
          {/* Floating card */}
          <div className="bg-white rounded-2xl shadow-lg max-w-md p-8">
            <h3 className="text-xl font-bold text-orange-600 mb-3">
              Trip Planner – <br /> Your Personal Itinerary
            </h3>
            <p className="text-gray-700 mb-6">
              Our trip planner makes your holiday booking a pleasure. Set the
              dates and pick your activities – we’ll guide you through the rest.
            </p>
            <a
              href="/plan-your-trip"
              className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-full font-medium transition"
            >
              KNOW MORE
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
