// AttractionSlider.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AttractionSlider({ images = [] }) {
  if (!images.length) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i} className="slider-item">
            <img
              src={img}
              alt={`attraction-${i}`}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
