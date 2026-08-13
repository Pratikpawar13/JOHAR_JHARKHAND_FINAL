export default function Contact() {
  return (
    <section className="section container-p">
      <h2 className="section-title mb-4">Contact Us</h2>
      <form className="grid gap-4 max-w-xl">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input type="email" className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Message</label>
          <textarea className="mt-1 w-full rounded-xl border px-3 py-2" rows={4} placeholder="How can we help?" />
        </div>
        <button className="rounded-xl bg-primary px-5 py-2 text-white">Send</button>
      </form>
    </section>
  )
}
