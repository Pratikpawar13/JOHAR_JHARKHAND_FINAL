import experience from "../assets/experiance.jpeg"

export default function Experiences() {
  const experiences = [
    { title: 'Wildlife & Safaris', copy: 'Betla National Park, Palamau Tiger Reserve.' },
    { title: 'Waterfalls Trail', copy: 'Hundru, Dassam, Jonha, Panchghagh.' },
    { title: 'Heritage & Temples', copy: 'Deoghar (Baidyanath), Itkhori, Maluti.' },
    { title: 'Hills & Sunsets', copy: 'Netarhat, Parasnath, Patratu Valley.' },
    { title: 'Tribal Culture', copy: 'Handicrafts, haats, festivals & cuisine.' },
  ]

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat py-16"
        style={{ backgroundImage: `url(${experience})` }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* content */}
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="section-title mb-6 text-white">Experiences</h2>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e) => (
            <div
              key={e.title}
              className="card p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md"
            >
              <h3 className="font-semibold text-lg">{e.title}</h3>
              <p className="muted mt-1">{e.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
