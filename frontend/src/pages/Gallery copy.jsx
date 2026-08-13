export default function Gallery() {
  const imgs = Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/seed/jh_${i}/600/400`)
  return (
    <section className="section container-p">
      <h2 className="section-title mb-6">Gallery</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {imgs.map((src, i) => (
          <img key={i} src={src} className="w-full h-48 object-cover rounded-xl" />
        ))}
      </div>
    </section>
  )
}
