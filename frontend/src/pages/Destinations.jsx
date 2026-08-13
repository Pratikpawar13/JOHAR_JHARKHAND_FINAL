import SectionHeader from '../components/SectionHeader.jsx'
import AttractionCard from '../components/AttractionCard.jsx'
import destinations from "../data/destinations.js";

export default function Destinations() {
  return (
    <section className="section container-p">
      <SectionHeader title="Destinations" subtitle="Explore cities, hills, waterfalls & wildlife" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <AttractionCard key={d.slug} item={d} />
        ))}
      </div>
    </section>
  )
}
