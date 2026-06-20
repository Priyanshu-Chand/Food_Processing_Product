import { motion } from 'framer-motion';
import { FiLayers, FiType } from 'react-icons/fi';
import { packagingResponse } from '../data/products';

export default function Packaging() {
  const packagingBriefs = packagingResponse.data;

  return (
    <div className="space-y-6">
      <section className="glass-card bg-hero p-6 md:p-8">
        <p className="subtle-label">Packaging Research Module</p>
        <h2 className="mt-2 font-display text-4xl text-primary">Design directions for premium organic retail.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-ink/72">
          This module gives HimShakti a clean framework for evaluating packaging tone, palette,
          material choice, and label storytelling before production-ready design work begins.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {packagingBriefs.map((brief, index) => (
          <motion.article
            key={brief.id}
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
          >
            <div className="border-b border-primary/8 bg-white/35 px-6 py-5">
              <p className="subtle-label">Product Line</p>
              <h3 className="mt-2 text-3xl font-semibold text-primary">{brief.title}</h3>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] bg-mist p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/55">Visual Tone</p>
                  <p className="mt-3 text-lg font-semibold text-primary">{brief.mood}</p>
                </div>
                <div className="rounded-[24px] bg-mist p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/55">Material Suggestion</p>
                  <p className="mt-3 text-lg font-semibold text-primary">{brief.material}</p>
                </div>
              </div>

              <div className="rounded-[24px] bg-white/60 p-5">
                <div className="flex items-center gap-2 text-primary">
                  <FiLayers />
                  <p className="text-sm font-semibold uppercase tracking-[0.25em]">Color Palette</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {brief.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-primary/10 bg-background px-4 py-2 text-sm font-semibold text-primary"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-white/60 p-5">
                <div className="flex items-center gap-2 text-primary">
                  <FiType />
                  <p className="text-sm font-semibold uppercase tracking-[0.25em]">Typography</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink/72">{brief.typography}</p>
              </div>

              <div className="rounded-[24px] bg-white/60 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Label Hierarchy</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {brief.labelHierarchy.map((item) => (
                    <div key={item} className="rounded-[18px] bg-background px-4 py-3 text-sm font-semibold text-primary">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-mist p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Label Information</p>
                <div className="mt-4 space-y-3">
                  {brief.labelDetails.map((detail) => (
                    <div key={detail} className="rounded-[18px] bg-white/80 px-4 py-3 text-sm leading-7 text-ink/72">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
