import { motion } from 'framer-motion';
import { FiBox, FiDollarSign, FiTag } from 'react-icons/fi';
import Button from '../components/Button';
import { productCatalogResponse } from '../data/products';

export default function AdminProducts() {
  const products = productCatalogResponse.data;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Listed Products', value: products.length, note: 'Customer-facing catalog items', icon: FiBox },
          { label: 'Avg Selling Price', value: 'Rs 156', note: 'Across current D2C assortment', icon: FiDollarSign },
          { label: 'Core Categories', value: '5', note: 'Millets, pickles, drinks, condiments, wellness', icon: FiTag },
        ].map(({ label, value, note, icon: Icon }, index) => (
          <motion.div
            key={label}
            className="glass-card p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
          >
            <Icon className="text-2xl text-accent" />
            <p className="mt-4 text-sm uppercase tracking-[0.28em] text-primary/55">{label}</p>
            <p className="mt-3 font-display text-4xl text-primary">{value}</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">{note}</p>
          </motion.div>
        ))}
      </section>

      <section className="glass-card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-primary/8 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="subtle-label">Admin Products</p>
            <h2 className="mt-2 text-2xl font-semibold text-primary">Product catalog management view</h2>
          </div>
          <Button variant="accent">Add Product</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/55 text-primary/70">
              <tr>
                {['Product', 'Category', 'Weight', 'Price', 'Tone', 'Status'].map((heading) => (
                  <th key={heading} className="px-6 py-4 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-primary/8">
                  <td className="px-6 py-4 font-semibold text-primary">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.weight}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.tone}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      Live
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
