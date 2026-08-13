export default function Festivals() {
  const items = [
    { title: 'Sarhul', desc: 'Spring festival celebrating Sal tree worship and nature.' },
    { title: 'Karma', desc: 'Tribal harvest festival with folk songs and dance.' },
    { title: 'Tusu Parab', desc: 'Harvest festival in southern Jharkhand.' },
  ]
  return (
    <section className="section container-p">
      <h2 className="section-title mb-6">Festivals</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <div key={f.title} className="card p-6">
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="muted mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
