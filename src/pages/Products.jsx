import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import useApiResource from '../hooks/useApiResource';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function Products() {
  const { data: products, isLoading, error, refetch } = useApiResource('/products', []);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    setQuantities((previous) =>
      Object.fromEntries(products.map((product) => [product.id, previous[product.id] ?? 1])),
    );
  }, [products]);

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

  if (isLoading) {
    return (
      <div className="section-shell py-10 md:py-14">
        <Loader message="Loading products from the backend catalog." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-shell py-10 md:py-14">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

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
          {products.map((product) => (
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
