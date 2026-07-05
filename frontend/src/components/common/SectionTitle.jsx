export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="section-title">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-3xl text-sm leading-6 text-slate-300">{description}</p> : null}
    </div>
  );
}

