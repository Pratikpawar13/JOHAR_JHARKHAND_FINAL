import React from 'react'
import DestinationCard from './DestinationCard'

export default function DestinationGrid({ items }) {
  const handleClick = (item) => {
    alert(`You clicked: ${item.title}`)
  }

  return (
    <section id="destinations" className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <DestinationCard key={item.id} item={item} onClick={handleClick} />
        ))}
      </div>
    </section>
  )
}
