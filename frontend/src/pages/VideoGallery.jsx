import React from 'react';

const VideoGallery = () => {
  // Sample video data based on Jharkhand Tourism YouTube channel
  const videos = [
    {
      title: 'Explore the Land of Forests',
      thumbnail: 'https://via.placeholder.com/320x180.png?text=Explore+the+Land+of+Forests',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with real video ID
    },
    {
      title: 'Jharkhand Waterfalls Adventure',
      thumbnail: 'https://via.placeholder.com/320x180.png?text=Jharkhand+Waterfalls',
      url: 'https://www.youtube.com/watch?v=4Qw4w9WgXcQ', // Replace with real video ID
    },
    {
      title: 'Vibrant Tribal Culture',
      thumbnail: 'https://via.placeholder.com/320x180.png?text=Tribal+Culture',
      url: 'https://www.youtube.com/watch?v=5Qw4w9WgXcQ', // Replace with real video ID
    },
    {
      title: 'Ranchi Rath Yatra Live',
      thumbnail: 'https://via.placeholder.com/320x180.png?text=Ranchi+Rath+Yatra',
      url: 'https://www.youtube.com/watch?v=6Qw4w9WgXcQ', // Replace with real video ID
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-tight flex items-center justify-center gap-2">
          Video Gallery
        </h1>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;