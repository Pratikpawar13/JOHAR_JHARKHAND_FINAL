import { Link } from "react-router-dom";
import j7 from "../assets/j7.jpg";
import j8 from "../assets/j8.jpg";
import j9 from "../assets/j9.jpg";

const images = { j7, j8, j9 };

export default function AttractionCard({ item }) {
  return (
    <Link
      to={`/destinations/${item.slug}`}
      className="card overflow-hidden group block rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

        {/* Title */}
        <h3 className="absolute bottom-3 left-3 text-white text-lg font-bold drop-shadow-md">
          {item.name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        <p className="muted text-sm line-clamp-2">{item.tagline}</p>
        <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:underline">
          Explore →
        </span>
      </div>
    </Link>
  );
}
