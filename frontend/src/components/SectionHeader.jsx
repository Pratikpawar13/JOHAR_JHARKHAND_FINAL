export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="muted mt-1">{subtitle}</p>}
    </div>
  )
}
