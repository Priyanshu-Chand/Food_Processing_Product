import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiMessageCircle, FiPhone, FiShield, FiTruck } from 'react-icons/fi';
import MapComponent from '../components/MapComponent';
import ProductCard from '../components/ProductCard';
import { productCatalogResponse } from '../data/products';
import { buildWhatsAppLink } from '../utils/whatsapp';

const storyPillars = [
  {
    title: 'Born in Uttarakhand',
    text: 'Every product carries the flavor memory of Himalayan kitchens, orchards, and village processing traditions.',
  },
  {
    title: 'Local Farmers',
    text: 'The platform helps HimShakti keep stronger relationships with producers and end customers at the same time.',
  },
  {
    title: 'Chemical Free Food',
    text: 'Clean-label storytelling and transparent product information build trust for modern health-conscious buyers.',
  },
];

export default function Home() {
  const products = productCatalogResponse.data;
  const [quantities, setQuantities] = useState(
    () => Object.fromEntries(products.map((product) => [product.id, 1])),
  );

  const featuredProducts = useMemo(() => products.slice(0, 6), []);

  const updateQuantity = (id, delta) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(1, (previous[id] ?? 1) + delta),
    }));
  };

  const orderProduct = (product) => {
    const quantity = quantities[product.id] ?? 1;
    const link = buildWhatsAppLink({
      productName: product.name,
      quantity,
      address: '',
    });
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pb-20">
      <section className="section-shell py-10 md:py-14">
        <motion.div
          className="glass-card soft-grid relative overflow-hidden bg-hero px-6 py-10 md:px-10 md:py-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="relative z-10">
              <p className="subtle-label">Pure Himalayan Taste</p>
              <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-primary md:text-6xl">
                From Uttarakhand villages to direct customer relationships.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
                HimShakti Digital Growth Platform brings premium food storytelling, WhatsApp commerce,
                inventory control, and business dashboards into one modern organic storefront.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
                  to="/products"
                >
                  Explore Products
                  <FiArrowRight />
                </Link>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-5 py-3.5 font-semibold text-primary transition hover:border-primary/30 hover:bg-white"
                  href={buildWhatsAppLink({
                    productName: 'HimShakti Product Catalog',
                    quantity: 1,
                    address: '',
                  })}
                  rel="noreferrer"
                  target="_blank"
                >
                  <FiMessageCircle />
                  Order on WhatsApp
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: FiTruck, title: 'Direct Selling', text: 'Distributor-free discovery and ordering' },
                  { icon: FiShield, title: 'Cleaner Branding', text: 'Premium descriptions and visual positioning' },
                  { icon: FiPhone, title: 'Faster Conversion', text: 'Instant WhatsApp ordering for mobile buyers' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-[24px] bg-white/55 p-4 backdrop-blur-xl">
                    <Icon className="text-2xl text-accent" />
                    <h3 className="mt-3 font-semibold text-primary">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-4">
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  className="glass-card relative overflow-hidden p-5"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.12, duration: 0.45 }}
                >
                  <div className={`absolute inset-y-0 right-0 w-1/3 bg-gradient-to-br ${product.imageGradient} opacity-90`} />
                  <div className="relative z-10 max-w-[65%]">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary/60">{product.category}</p>
                    <h3 className="mt-2 font-display text-3xl text-primary">{product.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section-shell py-8" id="story">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="subtle-label">Origin Story</p>
            <h2 className="section-title mt-3">A food brand rooted in place, now ready for digital growth.</h2>
          </div>
          <p className="text-base leading-8 text-ink/72">
            This frontend is designed to help HimShakti sell directly, tell better product stories, and
            operate with more clarity across stock, packaging, and profitability.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {storyPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="subtle-label">Pillar 0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold text-primary">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/70">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell py-10" id="products">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="subtle-label">Product Catalog</p>
            <h2 className="section-title mt-3">Healthy, regional, and ready for direct WhatsApp orders.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-ink/70">
            Each card supports quantity selection and a pre-filled WhatsApp order message for a smoother
            direct customer buying journey.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              onDecrease={() => updateQuantity(product.id, -1)}
              onIncrease={() => updateQuantity(product.id, 1)}
              onOrder={() => orderProduct(product)}
              product={product}
              quantity={quantities[product.id] ?? 1}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-white/75 px-5 py-3.5 text-sm font-semibold text-primary transition hover:bg-white"
            to="/products"
          >
            View Full Catalog
            <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="section-shell py-10" id="contact">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MapComponent />
          <div className="glass-card p-6 md:p-8">
            <p className="subtle-label">Factory Location</p>
            <h2 className="section-title mt-3">Meet HimShakti in Haldwani, Uttarakhand.</h2>
            <p className="mt-4 text-sm leading-7 text-ink/72">
              The contact section is designed to reassure online buyers with a clear location, fast ordering
              channel, and brand-origin trust signal.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] bg-mist p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/55">Address</p>
                <p className="mt-2 flex items-start gap-3 text-sm text-ink/80">
                  <FiMapPin className="mt-1 shrink-0 text-primary" />
                  Haldwani, Uttarakhand, India
                </p>
              </div>
              <div className="rounded-[24px] bg-mist p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/55">Contact</p>
                <p className="mt-2 flex items-center gap-3 text-sm text-ink/80">
                  <FiPhone className="text-primary" />
                  +91 90000 00000
                </p>
              </div>
              <a
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"
                href={buildWhatsAppLink({
                  productName: 'General Inquiry',
                  quantity: 1,
                  address: '',
                })}
                rel="noreferrer"
                target="_blank"
              >
                <FiMessageCircle />
                Start WhatsApp Conversation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
