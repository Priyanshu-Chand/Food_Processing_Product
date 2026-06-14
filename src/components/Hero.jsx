export default function Hero() {
  return (
    <section className="section-card overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
          Himalayan Food Processing
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-leaf sm:text-5xl">
          HimShakti Food Processing
        </h1>
        <p className="mt-4 text-xl font-medium text-earth">
          Pure Himalayan Goodness From Uttarakhand
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
          Turning Himalayan millets and fruits into premium natural products.
        </p>
        <button
          className="mt-8 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-white transition hover:bg-moss"
          type="button"
        >
          Explore Products
        </button>
      </div>
    </section>
  );
}
