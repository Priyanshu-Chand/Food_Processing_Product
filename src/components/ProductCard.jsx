import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import Button from './Button';

export default function ProductCard({ product, quantity, onDecrease, onIncrease, onOrder }) {
  return (
    <motion.article
      className="glass-card overflow-hidden"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${product.imageGradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_35%)]" />
        <div className="absolute left-5 top-5 rounded-full bg-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
          {product.category}
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/80">{product.origin}</p>
            <h3 className="font-display text-3xl">{product.shortLabel}</h3>
          </div>
          <div className="rounded-2xl bg-white/20 px-3 py-2 text-sm font-semibold backdrop-blur-md">
            {product.weight}
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">{product.tagline}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/55">Price</p>
            <p className="text-2xl font-bold text-accent">{product.price}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 rounded-full border border-primary/10 bg-mist px-3 py-2">
            <button
              className="grid h-8 w-8 place-items-center rounded-full bg-white text-primary transition hover:bg-primary hover:text-white"
              onClick={onDecrease}
              type="button"
            >
              <FiMinus />
            </button>
            <span className="w-6 text-center text-sm font-bold text-primary">{quantity}</span>
            <button
              className="grid h-8 w-8 place-items-center rounded-full bg-white text-primary transition hover:bg-primary hover:text-white"
              onClick={onIncrease}
              type="button"
            >
              <FiPlus />
            </button>
          </div>

          <Button className="px-4 py-3" onClick={onOrder}>
            <FiShoppingBag />
            Order Now
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
