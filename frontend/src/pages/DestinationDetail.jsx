import { useParams, Link } from 'react-router-dom'
import destinations from "../data/destinations.js";

export default function DestinationDetail() {
  const { slug } = useParams()
  const item = destinations.find((d) => d.slug === slug)
  if (!item) return (
    <section className="section container-p">
      <p className="muted">Destination not found.</p>
      <Link to="/destinations" className="text-primary">Back to Destinations</Link>
    </section>
  )

  return (
    <>
      <section className="relative h-[42vh] flex items-end">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${item.image})` }} />
        <div className="container-p relative z-10 text-white pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{item.name}</h1>
          <p className="text-gray-100 max-w-2xl">{item.tagline}</p>
        </div>
      </section>
      <section className="section container-p">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <h2 className="section-title">Overview</h2>
            <p className="muted">{item.description}</p>

            <h3 className="font-semibold text-xl">Things to Do</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {item.thingsToDo.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <aside className="card p-6 space-y-3">
            <h3 className="font-semibold">Travel Info</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Nearest Airport:</span> {item.travel.airport}</p>
              <p><span className="font-medium">Nearest Rail:</span> {item.travel.rail}</p>
              <p><span className="font-medium">Best Time:</span> {item.travel.bestTime}</p>
            </div>
            <a href="/plan-your-trip" className="inline-block rounded-xl bg-primary px-4 py-2 text-white">Plan Your Trip</a>
          </aside>
        </div>
      </section>
    </>
  )
}
