import carouselData from "../components/Carousel/data";

export default function ViewAll() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Explore All Attractions
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {carouselData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
                {item.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
