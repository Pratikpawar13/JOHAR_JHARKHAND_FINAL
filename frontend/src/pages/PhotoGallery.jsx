import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoGallery = () => {
  // Sample data for Jharkhand locations with multiple images
  const locations = [
    {
      name: 'Ranchi',
      images: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/48/68/f4/dassam-falls.jpg?w=500&h=-1&s=1 ',
        'https://s7ap1.scene7.com/is/image/incredibleindia/patratu-valley-ranchi-jharkhand-1-hero?qlt=82&ts=1726723957845 ',
        'https://s7ap1.scene7.com/is/image/incredibleindia/2-deori-temple-ranchi-jharkhand-deori-mandir-city-hero?qlt=82&ts=1726723880071',
      ],
    },
    {
      name: 'Jamshedpur',
      images: [
        'data:image/jpeg;base64,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',
        'https://img.traveltriangle.com/blog/wp-content/uploads/2023/07/Jamshedpur-Cover-1.jpg',
        'https://s7ap1.scene7.com/is/image/incredibleindia/bhuvaneshwari-temple-jamshedpur-jharkhand-1-attr-hero?qlt=82&ts=1742156483441',
      ],
    },
    {
      name: 'Deoghar',
      images: [
        'https://hblimg.mmtcdn.com/content/hubble/img/ttd_images_march/mmt/activities/t_ufs/m_Deoghar_naulakha_temple_1_l_479_640.jpg',
        'https://res.cloudinary.com/chasset/image/upload/c_scale,dpr_auto,e_improve,f_webp,w_auto/v1/hbimages/mobile/location/1500438363123-Baba-baidyanath.jpg',
        'https://www.bihartrip.com/pub/media/Deoghar/Deoghar_Tour_Packages_12_.jpg',
      ],
    },
    {
      name: 'Dhanbad',
      images: [
        'https://img.traveltriangle.com/blog/wp-content/uploads/2023/09/Birsa-Munda-Park.jpg',
        'https://sonotelhotels.com/upload/fileManager/Blog/Year2024/Bhatinda24.jpeg',
        'https://sonotelhotels.com/upload/fileManager/Blog/old/TouristAttractions08.jpg',
      ],
    },
    {
      name: 'Bokaro',
      images: [
        'https://seoimgak.mmtcdn.com/blog/sites/default/files/images/Bokaro.jpg',
        'https://www.hlimg.com/images/stories/738X538/kali%20mandir_1468562947u40.jpg?w=400&dpr=2.6',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkYozSvc29lghhxnepLPi52POxhPguHatDVv1FiwmIWW84ZAjt9O4yx2pqA5pH2tS2lGM&usqp=CAU',
      ],
    },
    {
      name: 'Sahibganj',
      images: [
        'https://via.placeholder.com/800x600.png?text=Sahibganj+1',
        'https://via.placeholder.com/800x600.png?text=Sahibganj+2',
        'https://via.placeholder.com/800x600.png?text=Sahibganj+3',
      ],
    },
    {
      name: 'Palamu',
      images: [
        'https://via.placeholder.com/800x600.png?text=Palamu+1',
        'https://via.placeholder.com/800x600.png?text=Palamu+2',
        'https://via.placeholder.com/800x600.png?text=Palamu+3',
      ],
    },
    {
      name: 'Hazaribagh',
      images: [
        'https://via.placeholder.com/800x600.png?text=Hazaribagh+1',
        'https://via.placeholder.com/800x600.png?text=Hazaribagh+2',
        'https://via.placeholder.com/800x600.png?text=Hazaribagh+3',
      ],
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeIndices, setActiveIndices] = useState(
    locations.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );

  // Handle card click to open slider
  const handleCardClick = (location, index) => {
    setSelectedLocation(location);
    setCurrentImageIndex(activeIndices[locations.indexOf(location)]);
  };

  // Navigate to next image
  const handleNext = () => {
    if (selectedLocation) {
      const locationIndex = locations.indexOf(selectedLocation);
      setCurrentImageIndex((prev) =>
        prev === selectedLocation.images.length - 1 ? 0 : prev + 1
      );
      setActiveIndices((prev) => ({
        ...prev,
        [locationIndex]: currentImageIndex === selectedLocation.images.length - 1 ? 0 : currentImageIndex + 1,
      }));
    }
  };

  // Navigate to previous image
  const handlePrev = () => {
    if (selectedLocation) {
      const locationIndex = locations.indexOf(selectedLocation);
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedLocation.images.length - 1 : prev - 1
      );
      setActiveIndices((prev) => ({
        ...prev,
        [locationIndex]: currentImageIndex === 0 ? selectedLocation.images.length - 1 : currentImageIndex - 1,
      }));
    }
  };

  // Close slider
  const handleClose = () => {
    setSelectedLocation(null);
  };

  // Current image index for the slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-tight flex items-center justify-center gap-2">
          Photo Gallery
        </h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, locationIndex) => (
            <div
              key={location.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
              onClick={() => handleCardClick(location, activeIndices[locationIndex])}
            >
              <img
                src={location.images[activeIndices[locationIndex]]}
                alt={`${location.name} Image ${activeIndices[locationIndex] + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{location.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Modal */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full relative">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              >
                &times;
              </button>
              <img
                src={selectedLocation.images[currentImageIndex]}
                alt={`${selectedLocation.name} Image ${currentImageIndex + 1}`}
                className="w-full h-96 object-contain"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrev}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition flex items-center"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-gray-700">
                  {currentImageIndex + 1} / {selectedLocation.images.length}
                </span>
                <button
                  onClick={handleNext}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition flex items-center"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                {selectedLocation.name}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;