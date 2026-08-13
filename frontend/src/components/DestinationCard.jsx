import React from 'react'

export default function DestinationCard({ item, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(item) }}
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div>
          <h3 className="text-white text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-200">{item.location}</p>
        </div>
      </div>
      <div className="p-3 bg-white">
        <h4 className="font-semibold">{item.title}</h4>
        <p className="text-sm text-gray-500">{item.location}</p>
      </div>
    </div>
  )
}
