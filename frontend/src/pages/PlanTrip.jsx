export default function PlanTrip() {
  return (
    <section className="section container-p">
      <h2 className="section-title mb-4">Plan Your Trip</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">How to Reach</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Air: Birsa Munda Airport (Ranchi, IXR)</li>
            <li>Rail: Ranchi, Dhanbad, Jamshedpur major junctions</li>
            <li>Road: National Highways and frequent intercity buses</li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-2">Visitor Essentials</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>October–March offers the best weather</li>
            <li>Carry cash for remote areas; ATMs limited</li>
            <li>Eco-sensitive zones: follow park regulations</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
