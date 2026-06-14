export default function Card({ title, description }) {
  return (
    <article className="section-card h-full p-6">
      <div className="mb-4 h-1.5 w-16 rounded-full bg-leaf" />
      <h3 className="text-xl font-semibold text-leaf">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-700">{description}</p>
    </article>
  );
}
