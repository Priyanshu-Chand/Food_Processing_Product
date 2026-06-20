import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { productCatalogResponse } from '../data/products';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function Products() {
  const products = productCatalogResponse.data;
  const [quantities, setQuantities] = useState(
    () => Object.fromEntries(products.map((product) => [product.id, 1])),
  );

  const groupedProducts = useMemo(() => products, [products]);

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
    <div className="section-shell pb-20 pt-10 md:pt-14">
      <motion.section
        className="glass-card bg-hero p-6 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="subtle-label">Customer Catalog</p>
        <h1 className="mt-3 font-display text-4xl text-primary md:text-5xl">
          Explore HimShakti products ready for direct WhatsApp ordering.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/72">
          This public catalog is designed for customers only. It focuses on discovery, product trust,
          quantity selection, and quick conversion into direct HimShakti conversations.
        </p>
      </motion.section>

      <section className="mt-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {groupedProducts.map((product) => (
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
      </section>
    </div>
  );
}
