import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import AttractionCard from "./AttractionCard";

const attractions = [
  { name: "Place 7", slug: "place-7", tagline: "Beautiful place", image: "j7" },
  { name: "Place 8", slug: "place-8", tagline: "Amazing view", image: "j8" },
  { name: "Place 9", slug: "place-9", tagline: "Must visit", image: "j9" },
  { name: "Place 10", slug: "place-10", tagline: "Adventure spot", image: "j7" },
  { name: "Place 11", slug: "place-11", tagline: "Cultural heritage", image: "j8" },
];

export default function AttractionsList() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Attractions</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {attractions.map((item) => (
          <SwiperSlide key={item.slug}>
            <AttractionCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
